const express = require("express");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const rateLimiter = require("./middleware/rateLimiter.js");
const errorMiddleware = require("./middleware/errorHandler.js");
const connectDB = require("./db/connect.js");
const movieRoutes = require("./routes/movieRoutes.js");
const app = express();

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(errorMiddleware);


app.use(movieRoutes);

app.get('*', (req, res, next) =>{
  res.status(404).json({
    type: 'Resource Not Found',
    message: "Could not find the resource you're looking for"
  })
})

connectDB();

app.listen(8000, ()=>{
  console.log(`::: server started on port 8000 :::`)
})

module.exports = app;
