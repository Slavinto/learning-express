const User = require('../models/user-model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app-error');
const factory = require('./handler-factory');

const filterObj = (obj, ...fields) => {
  const outputObj = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) {
      outputObj[el] = obj[el];
    }
  });
  return outputObj;
};

// ===============================================
// user router request handlers

exports.updateMyProfile = catchAsync(async (req, res, next) => {
  // create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Error. Please enter valid profile data', 400));
  }
  // filtering out user object fields that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMyAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Create user route is invalid, please use (/signup) instead',
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUserById = factory.getOne(User);
// for updating user profile info
// not for updating password
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
