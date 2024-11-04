import mongoose from "mongoose";
import config from "../config.js";    
import seedDB from "./seed.js";


const connectDB = async () => {
  const uri = config.dbUri;
  mongoose
    .connect(uri)
    .then(() => {
      console.log("::: Connected to the database sucessfully :::");
      seedDB();
    })
    .catch((error) => console.log(error));
};

module.exports = connectDB;
