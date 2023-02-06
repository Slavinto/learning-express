const Review = require('../models/review-model');
const APIFeatures = require('../utils/features');
const AppError = require('../utils/app-error');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  // execute the query
  //   const features = new APIFeatures(Review.find(), req.query)
  //     .filter()
  //     .sort()
  //     .limit()
  //     .paginate();
  //   const reviews = await features.query;

  const reviews = await Review.find();

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
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
