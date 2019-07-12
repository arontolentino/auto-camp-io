//const fs = require('fs');
const Car = require('./../models/carModels');

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();

    res.status(200).json({
      status: 'success',
      results: cars.length,
      data: {
        cars
      }
    });
  } catch (err) {
    res.status(404).jason({
      status: 'fail',
      message: err
    });
  }
};

exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        car
      }
    });
  } catch (err) {
    res.status(404).jason({
      status: 'fail',
      message: err
    });
  }
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

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        car
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteCar = (req, res) => {
  res.status(204).json({
    status: 'success',
    // null means data no longer exist
    data: null
  });
};
