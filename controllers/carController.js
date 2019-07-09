const fs = require('fs');

// JSON.parse parses json file into an array of JavaScript object
const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/cars.json`)
);

// Only use val when using router.param
exports.checkID = (req, res, next, val) => {
  console.log(`Car id is: ${val}`);

  if (req.params.id * 1 > cars.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  // Runs the next function
  next();
};

exports.checkBody = (req, res, next) => {
  console.log(`Car name is: ${req.body.name}`);

  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name'
    });
  }
  next();
};

exports.getAllCars = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: cars.length,
    data: {
      cars
    }
  });
};

exports.getCar = (req, res) => {
  console.log(req.params);

  // Converts string from req.params to number
  const id = req.params.id * 1;

  // find() method returns the value of the first element in the array that satisfies the provided testing function
  const car = cars.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      car
    }
  });
};

exports.createCar = (req, res) => {
  // console.log(req.body);
  const newId = cars[cars.length - 1].id + 1;
  // Object.assign creates a new object by merging two existing objects together
  const newCar = Object.assign({ id: newId }, req.body);

  // Pushes newCar to array
  cars.push(newCar);

  // Overwrites cars.js with new array
  fs.writeFile(
    `${__dirname}/dev-data/data/cars.json`,
    // JSON.stringfy() method converts a JavaScript onbject or value to a JSON string
    JSON.stringify(cars),
    err => {
      res.status(201).json({
        status: 'sucess',
        data: {
          car: newCar
        }
      });
    }
  );
};
<<<<<<< HEAD

exports.updateCar = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      car: '<Updated car here...>'
    }
  });
};

exports.deleteCar = (req, res) => {
  res.status(204).json({
    status: 'success',
    // null means data no longer exist
    data: null
  });
};
=======
>>>>>>> master
