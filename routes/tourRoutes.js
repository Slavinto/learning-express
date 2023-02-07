const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllTours,
  createTour,
  updateTour,
  getTourById,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');

const reviewRouter = require('./reviewRoutes');
// =====================================================
// initializing express router - mounting the router
const router = express.Router();

// POST /tour/dfs34gdsfg/reviews  ---> nested route (post a review)
// GET /tour/dfs34gdsfg/reviews  ---> nested route (get all reviews)
// PATCH /tour/__tourId__dfs34gdsfg/reviews/__reviewId__pgj343g98j39  ---> nested route (edit review)

router.use('/:tourId/reviews', reviewRouter);

router.route('/stats').get(getTourStats, getAllTours);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/top-5').get(aliasTopTours, getAllTours);

router.route('/').get(protect, getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
