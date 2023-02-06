const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const {
  getAllReviews,
  createReview,
} = require('../controllers/reviewController');
// =====================================================
// initializing express router - mounting the router
const router = express.Router();

// '/' === 'api/v1/reviews'

router.get('/', getAllReviews);
router.post('/', protect, restrictTo('user'), createReview);

module.exports = router;
