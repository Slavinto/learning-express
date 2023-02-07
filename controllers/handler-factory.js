const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app-error');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndRemove(id);

    if (!doc) {
      return next(new AppError(`Tour with id ${id} doesn't exist`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
