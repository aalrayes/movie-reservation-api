import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import rateLimiter from "./middleware/rateLimitMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import movieRoutes from "./routes/movieRoutes.js";
import morgan from "morgan";

const app = express();

app.use(morgan("combined"));
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
    message: "Could not find the specified path you're looking for"
  })
})


export default app;
