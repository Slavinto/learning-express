const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourAndUserIds,
  getReview,
} = require('../controllers/reviewController');
// =====================================================
// initializing express router - mounting the router
const router = express.Router({ mergeParams: true });

// '/' === 'api/v1/reviews'
router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourAndUserIds, createReview);

router.route('/:id').get(getReview).delete(deleteReview).patch(updateReview);

module.exports = router;
