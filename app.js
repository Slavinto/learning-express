const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/app-error');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// 1. Middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// using router for certain route - middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// if none of the above routehandlers was triggered handle the requested route as not found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// errorhandling middleware
app.use(globalErrorHandler);

// 2. Starting server
module.exports = app;
