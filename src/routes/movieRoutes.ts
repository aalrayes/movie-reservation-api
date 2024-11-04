import express from "express";
import movieController from "../controllers/movieController.js";
import validate from "../middleware/validationMiddleware.js";
import { checkAvailabilitySchema, paginationSchema, reservationSchema } from "../schemas/movieSchema.js";

const router = express.Router();

router.get("/api/v1/movies", validate(paginationSchema), movieController.listMovies);
router.get(
  "/api/v1/movies/:movieId/timeslots/:timeSlotId/availability",
  validate(checkAvailabilitySchema),
  movieController.checkAvailability
);
router.put(
  "/api/v1/movies/:movieId/timeslots/:timeSlotId/reserve",
  validate(checkAvailabilitySchema, reservationSchema),
  movieController.reserveTimeSlot
);

export default router;
