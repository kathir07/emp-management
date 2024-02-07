const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGODB_URL);
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to Database:', error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;