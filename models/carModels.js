const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
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
  },
  horsepower: {
    type: Number,
    required: [true, 'A car must have a horsepower rating']
  },
  torque: {
    type: Number,
    required: [true, 'A car must have a torque rating']
  },
  category: {
    type: String,
    required: [true, 'A car must have a category']
  },
  city: {
    type: String,
    required: [true, 'A car must have a city']
  },
  state: {
    type: String,
    required: [true, 'A car must have a state']
  },
  country: {
    type: String,
    required: [true, 'A car must have a country']
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A car must have a description']
  },
  likesQuantity: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A car must have a cover image']
  },
  images: [String],
  featured: {
    type: Boolean,
    default: false
  }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
