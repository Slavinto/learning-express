const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app-error');
const APIFeatures = require('../utils/features');

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

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`Document with id ${id} doesn't exist`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let query = await Model.findById(id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError(`Document with id ${id} doesn't exist`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // to allow nested getReview on tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // execute the query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      requestTime: req.requestTime,
      status: 'success',
      results: `${doc.length}`,
      data: {
        data: doc,
      },
    });
  });
