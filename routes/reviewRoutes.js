const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const {
  getAllReviews,
  createReview,
  deleteReview,
} = require('../controllers/reviewController');
// =====================================================
// initializing express router - mounting the router
const router = express.Router({ mergeParams: true });

// '/' === 'api/v1/reviews'

router.get('/', getAllReviews);
router.post('/', protect, restrictTo('user'), createReview);

router.delete('/:id', deleteReview);

module.exports = router;
