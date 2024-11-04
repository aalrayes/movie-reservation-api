import app from "./app.js";
import connectDB from "./db/connect.js";
import config from "./config.js";

connectDB();

app.listen(config.port, ()=>{
  console.log(`::: server started on port ${config.port} :::`)
})