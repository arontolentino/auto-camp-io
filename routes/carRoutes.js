const express = require('express');
const carController = require('./../controllers/carController');

const router = express.Router();

// Checks if id exists using checkID middleware
// router.param('id', carController.checkID);

router
  .route('/top-50-cars')
  .get(carController.aliasTopCars, carController.getAllCars);

router
  .route('/')
  .get(carController.getAllCars)
  .post(carController.createCar);

router
  .route('/:id')
  .get(carController.getCar)
  .patch(carController.updateCar)
  .delete(carController.deleteCar);

module.exports = router;
