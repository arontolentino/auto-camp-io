const mongoose = require('mongoose');
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
const dotenv = require('dotenv');
const app = require('./app');

// Reading enivonrment variables
dotenv.config({ path: './config.env' });

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

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
