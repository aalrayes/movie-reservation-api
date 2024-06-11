const app = require("./app");
const connectDB = require("./db/connect.js");

connectDB();

app.listen(8000, ()=>{
  console.log(`::: server started on port 8000 :::`)
})