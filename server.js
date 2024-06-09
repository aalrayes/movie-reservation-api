const express = require("express");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const limiter = require("./src/middleware/rateLimiter.js");
const errorMiddleware = require("./src/middleware/error.js");
const connectDB = require("./src/db/connect.js");
const movieRoutes = require("./src/routes/movieRoutes.js");
const app = express();

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorMiddleware);
app.use(limiter);

app.use(movieRoutes);

connectDB();

app.listen(8000, ()=>{
  console.log(`::: server started on port 8000 :::`)
})

module.exports = app;
