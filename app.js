const express = require('express');
// HTTP request logger middleware
const morgan = require('morgan');

const carRouter = require('./routes/carRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// ============================ //
// MIDDLEWARES
// ============================ //

// Only run HTTP request logger during dev mode
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Used to show time on an HTTP request
app.use((req, rest, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());

// Used to serve static files
app.use(express.static(`${__dirname}/public`));

// ============================ //
// ROUTES
// ============================ //

app.use('/api/v1/cars', carRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
