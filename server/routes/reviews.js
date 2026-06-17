const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Property = require('../models/Property');
const { protect } = require('../middleware/auth');

// @desc    Get reviews
// @route   GET /api/reviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { propertyId } = req.query;
    let query = {};
    if (propertyId) {
      query.property = propertyId;
    }
    const reviews = await Review.find(query).populate('property', 'title').sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { propertyId, rating, text, name, role } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const review = await Review.create({
      user: req.user.id,
      property: propertyId,
      name: name || req.user.name,
      role: role || 'Resident',
      text,
      rating: Number(rating),
    });

    // Recalculate average rating & reviewsCount for the property
    const allReviews = await Review.find({ property: propertyId });
    const count = allReviews.length;
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / count;

    property.reviewsCount = count;
    property.rating = Math.round(avg * 10) / 10;
    await property.save();

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
