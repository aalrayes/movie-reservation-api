const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const { body } = require("express-validator");

router.get("/v1/movies", movieController.listMovies);
router.get(
  "/v1/movies/:movieId/timeslots/:timeSlotId",
  movieController.checkAvailability
);
router.post(
  "/v1/movies/:movieId/timeslots/:timeSlotId/reserve",
  body('numberOfPeople').isNumeric(),
  movieController.reserveTimeSlot
);

module.exports = router;
