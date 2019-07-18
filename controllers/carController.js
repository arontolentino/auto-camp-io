//const fs = require('fs');
const Car = require('./../models/carModels');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopCars = (req, res, next) => {
  req.query.limit = '50';
  req.query.sort = '-likesQuantity';
  next();
};

exports.getAllCars = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Car.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const cars = await features.query;

    // SEND RESPONSE
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

exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      // null means data no longer exist
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
