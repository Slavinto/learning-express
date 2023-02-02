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
// =====================================================
// initializing express router - mounting the router
const router = express.Router();

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
