const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { protect, admin } = require('../middleware/auth');

// @desc    Get all properties with filtering
// @route   GET /api/properties
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { city, gender, sharing, amenity, priceMin, priceMax, search } = req.query;
    let query = {};

    // Filter by city
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    // Filter by gender preference
    if (gender) {
      query.gender = gender;
    }

    // Filter by occupancy sharing type
    if (sharing) {
      query['sharingOptions.type'] = sharing;
    }

    // Filter by amenities (match all selected amenities)
    if (amenity) {
      const amenitiesList = Array.isArray(amenity) ? amenity : [amenity];
      query.amenities = { $all: amenitiesList };
    }

    // Filter by price range
    if (priceMin || priceMax) {
      query.sharingOptions = {
        $elemMatch: {
          price: {
            ...(priceMin && { $gte: Number(priceMin) }),
            ...(priceMax && { $lte: Number(priceMax) }),
          },
        },
      };
    }

    // Search query (matches title, description, or address)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    const properties = await Property.find(query);
    res.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.json({
      success: true,
      message: 'Property removed successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
