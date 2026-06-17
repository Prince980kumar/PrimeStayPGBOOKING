const mongoose = require('mongoose');

const sharingOptionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['single', 'double', 'triple'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,
    default: 5,
  },
});

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a property title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
      trim: true,
    },
    gender: {
      type: String,
      enum: ['boys', 'girls', 'unisex'],
      required: [true, 'Please specify gender target'],
    },
    sharingOptions: [sharingOptionSchema],
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    reviewsCount: {
      type: Number,
      default: 12,
    },
    rules: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Property', propertySchema);
