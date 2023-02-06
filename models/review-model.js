const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
      required: [true, 'Review text required'],
      validate: {
        message: 'Minimum review length is 10 characters',
        validator: function (val) {
          return val.length >= 10;
        },
      },
    },
    rating: {
      type: Number,
      default: 4,
      validate: {
        message: 'Invalid rating value (must be from 1 to 5)',
        validator: function (val) {
          return val >= 1 && val <= 5;
        },
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Invalid tour specified'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Invalid user specified'],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// middleware
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
    select: 'name',
  });
  this.populate({ path: 'user', select: 'name photo' });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
