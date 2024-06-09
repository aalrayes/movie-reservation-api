const mongoose = require("mongoose");
const dotenv = require("dotenv");
const seedDB = require("./seed.js");
dotenv.config();

const connectDB = async () => {
  const uri = process.env.DB_URI;
  mongoose
    .connect(uri)
    .then(() => {
      console.log("::: Connected to the database sucessfully :::");
      seedDB();
    })
    .catch((error) => console.log(error));
};

module.exports = connectDB;
