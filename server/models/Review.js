const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Please associate review with a PG property'],
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    role: {
      type: String,
      default: 'Resident',
    },
    text: {
      type: String,
      required: [true, 'Please add a review text'],
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating between 1 and 5'],
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
