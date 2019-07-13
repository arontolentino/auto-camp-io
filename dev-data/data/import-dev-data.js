const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('./../../models/carModels');

// Reading enivornment varibales
dotenv.config({ path: './../../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successful');
  });

// READ JSON FILE
const cars = JSON.parse(fs.readFileSync(`${__dirname}/cars.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Car.create(cars);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log.og(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Car.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
