//const fs = require('fs');
const Car = require('./../models/carModels');

exports.getAllCars = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime
    // results: cars.length,
    // data: {
    //   cars
    // }
  });
};

exports.getCar = (req, res) => {
  console.log(req.params);

  // Converts string from req.params to number
  const id = req.params.id * 1;
};

exports.createCar = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newCar = await Car.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newCar
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

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
