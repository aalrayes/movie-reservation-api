const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/v1/movies", movieController.listMovies);

router.get(
  "/v1/movies/:movieId/timeslots/:timeSlotId/availability",
  movieController.checkAvailability
);

router.put(
  "/v1/movies/:movieId/timeslots/:timeSlotId/reserve",
  movieController.reserveTimeSlot
);

module.exports = router;
