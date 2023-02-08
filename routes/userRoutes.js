const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController');

const {
  getMe,
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  updateMyProfile,
  deleteMyAccount,
} = require('../controllers/userController');

const { protect, restrictTo } = require('../controllers/authController');

//====================================================
// initializing express router - mounting the router
const router = express.Router();

// '/' === 'api/v1/users'
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// all routes middleware below are protected
router.use(protect);

router.get('/me', getMe, getUserById);
router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMyProfile', updateMyProfile);
router.delete('/deleteMyAccount', deleteMyAccount);

// restricts certain routes to certain users
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
