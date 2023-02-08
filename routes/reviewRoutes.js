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

// protect all routes below
router.use(protect);

// '/' === 'api/v1/reviews'
router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourAndUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .delete(restrictTo('user', 'admin'), deleteReview)
  .patch(restrictTo('user', 'admin'), updateReview);

module.exports = router;
