const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/app-error');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// 1. Middlewares
// set security http headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body parser - reading data from body into req.body
app.use(
  express.json({
    limit: '10kb',
  })
);

// data sanitization against noSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

// data sanitization against parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// serving static files
app.use(express.static(`${__dirname}/public`));

// limit amount of requests from same ip
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    'Service suspended for 1 hour. Too many requests. Please try again later',
});

app.use('/api', limiter);

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
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
