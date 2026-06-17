const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const { protect, admin } = require('../middleware/auth');

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('property', 'title address city');
    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get logged in user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
router.get('/my-bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('property', 'title address city images');
    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { propertyId, roomType, startDate, durationMonths } = req.body;

    // Validate property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Find requested room type and check availability
    const sharingOpt = property.sharingOptions.find(opt => opt.type === roomType);
    if (!sharingOpt) {
      return res.status(400).json({ success: false, message: 'Selected sharing room type is not available in this property' });
    }

    if (sharingOpt.available <= 0) {
      return res.status(400).json({ success: false, message: 'No rooms available for this sharing option' });
    }

    // Calculate total price based on duration
    const pricePerMonth = sharingOpt.price;
    const totalPrice = pricePerMonth * Number(durationMonths);

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      property: propertyId,
      roomType,
      price: totalPrice,
      startDate: new Date(startDate),
      durationMonths: Number(durationMonths),
      status: 'pending', // Starts as pending, requires admin approval or auto-confirms in payment flow
    });

    // Decrement availability
    sharingOpt.available -= 1;
    await property.save();

    // Populate property details before returning
    const populatedBooking = await Booking.findById(booking._id).populate('property', 'title address city');

    // Send email notifications
    const sendEmail = require('../utils/sendEmail');
    const adminEmailContent = `
      <h3>New PG Booking Received!</h3>
      <p>A new PG booking has been created on Prime Stay LPU.</p>
      <h4>Booking Details:</h4>
      <ul>
        <li><strong>Customer Name:</strong> ${req.user.name}</li>
        <li><strong>Customer Email:</strong> ${req.user.email}</li>
        <li><strong>Customer Phone:</strong> ${req.user.phone || 'N/A'}</li>
        <li><strong>Property:</strong> ${property.title} (${property.city})</li>
        <li><strong>Room Type:</strong> ${roomType}</li>
        <li><strong>Duration:</strong> ${durationMonths} Months</li>
        <li><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</li>
        <li><strong>Total Price:</strong> ₹${totalPrice}</li>
      </ul>
      <p>Please log in to the admin panel to review and approve this booking.</p>
    `;

    const userEmailContent = `
      <h3>Booking Received - Prime Stay LPU</h3>
      <p>Dear ${req.user.name},</p>
      <p>Thank you for choosing Prime Stay LPU. We have received your booking request and it is currently pending approval.</p>
      <h4>Booking Details:</h4>
      <ul>
        <li><strong>Property:</strong> ${property.title}</li>
        <li><strong>Room Type:</strong> ${roomType}</li>
        <li><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</li>
        <li><strong>Duration:</strong> ${durationMonths} Months</li>
        <li><strong>Total Price:</strong> ₹${totalPrice}</li>
      </ul>
      <p>We will notify you once your booking is confirmed.</p>
      <p>Best regards,<br/>Prime Stay LPU Team</p>
    `;

    // Fire email notifications in background/try-catch to not block the request
    Promise.all([
      sendEmail({
        to: process.env.EMAIL_RECEIVER || 'princepratap980@gmail.com',
        subject: `New PG Booking - ${property.title}`,
        text: `New PG Booking details: Customer Name: ${req.user.name}, Email: ${req.user.email}, Phone: ${req.user.phone || 'N/A'}, Property: ${property.title}, Room Type: ${roomType}, Duration: ${durationMonths} Months, Total Price: ₹${totalPrice}`,
        html: adminEmailContent
      }),
      sendEmail({
        to: req.user.email,
        subject: `Booking Request Received - ${property.title}`,
        text: `Booking Request Received: Dear ${req.user.name}, thank you for your booking at ${property.title}. We will process it shortly.`,
        html: userEmailContent
      })
    ]).catch(err => {
      console.error('Failed to send email notifications:', err);
    });

    res.status(201).json({
      success: true,
      data: populatedBooking,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Update booking status (Admin only)
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['confirmed', 'cancelled', 'pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // If booking is cancelled, return the room availability
    if (status === 'cancelled' && booking.status !== 'cancelled') {
      const property = await Property.findById(booking.property);
      if (property) {
        const sharingOpt = property.sharingOptions.find(opt => opt.type === booking.roomType);
        if (sharingOpt) {
          sharingOpt.available += 1;
          await property.save();
        }
      }
    }
    
    // If booking was cancelled and is now being re-confirmed
    if (status === 'confirmed' && booking.status === 'cancelled') {
      const property = await Property.findById(booking.property);
      if (property) {
        const sharingOpt = property.sharingOptions.find(opt => opt.type === booking.roomType);
        if (sharingOpt) {
          if (sharingOpt.available <= 0) {
            return res.status(400).json({ success: false, message: 'Cannot confirm booking. No rooms available' });
          }
          sharingOpt.available -= 1;
          await property.save();
        }
      }
    }

    booking.status = status;
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone')
      .populate('property', 'title address city');

    res.json({
      success: true,
      data: updatedBooking,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
