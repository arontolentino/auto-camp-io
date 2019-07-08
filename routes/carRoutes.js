const express = require('express');
const carController = require('./../controllers/carController');

const router = express.Router();

// Checks if id exists using checkID middleware
router.param('id', carController.checkID);

router
  .route('/')
  .get(carController.getAllCars)
  .post(carController.checkBody, carController.createCar);

module.exports = router;
