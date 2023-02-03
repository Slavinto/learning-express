const User = require('../models/user-model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app-error');

// ====================================================
// user router request handlers
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    requestTime: req.requestTime,
    status: 'success',
    results: `${users.length}`,
    data: { users },
  });
});

exports.updateMyProfile = catchAsync(async (req, res, next) => {
  // create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Error. Please enter valid profile data', 400));
  }
  // update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id);
  user.name = 'Jonas';
  user.save();

  res.status(200).json({
    status: 'success',
    data: {
      user: 'placeholder',
    },
  });
});

exports.getUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Get user by id route is not yet implemented',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Create user route is not yet implemented',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Update user route is not yet implemented',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Delete user route is not yet implemented',
  });
};
