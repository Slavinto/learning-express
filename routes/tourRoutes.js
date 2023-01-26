const express = require('express');

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

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
