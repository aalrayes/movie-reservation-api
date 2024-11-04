import express from "express";
import movieController from "../controllers/movieController.js";

const router = express.Router();

router.get("/v1/movies", movieController.listMovies);
router.get(
  "/v1/movies/:movieId/timeslots/:timeSlotId/availability",
  movieController.checkAvailability
);
router.put(
  "/v1/movies/:movieId/timeslots/:timeSlotId/reserve",
  movieController.reserveTimeSlot
);

export default router;
