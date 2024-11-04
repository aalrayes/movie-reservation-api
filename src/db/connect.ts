import mongoose from "mongoose";
import config from  "../config.js"
import seedDB from "./seed.js";


const connectDB = async () => {
  try {
    const uri = config.dbUri;
    if (!uri) {
    throw new Error("Database URI is not defined");
  }
  
  mongoose
    .connect(uri)
    .then(() => {
      console.log("::: Connected to the database sucessfully :::");
      seedDB();
    })
    .catch((error) => console.log(error));
  } catch (error) {
    console.error("::: Failed to connect to the database :::", error);
  }
};

export default connectDB;