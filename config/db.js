const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/etherscan', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);  // Exit the process if the DB connection fails
  }
};

module.exports = connectDB;
