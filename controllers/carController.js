//const fs = require('fs');
const Car = require('./../models/carModels');

exports.getAllCars = async (req, res) => {
  try {
    // BUILD QUERY
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    console.log(JSON.parse(queryStr));

    let query = Car.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Car.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exists');
    }

    // EXECUTE QUERY
    const cars = await query;

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
