const Review = require('../models/review-model');
// const APIFeatures = require('../utils/features');
const AppError = require('../utils/app-error');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handler-factory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);

  if (reviews.length === 0) {
    return next(new AppError('No reviews found', 404));
  }

  res.status(200).json({
    requestTime: req.requestTime,
    status: 'success',
    results: `${reviews.length}`,
    data: { reviews },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.deleteReview = factory.deleteOne(Review);
