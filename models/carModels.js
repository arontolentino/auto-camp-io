const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'A car must have a make']
  },
  model: {
    type: String,
    required: [true, 'A car must have a model'],
    default: 'Unknown'
  },
  year: {
    type: Number,
    required: [true, 'A car must have a year manufactured']
  }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
