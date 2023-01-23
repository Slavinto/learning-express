const express = require('express');
const {
  getAllTours,
  createTour,
  updateTour,
  getTourById,
  deleteTour,
} = require('../controllers/tourController');
// =====================================================
// initializing express router - mounting the router
const router = express.Router();

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
