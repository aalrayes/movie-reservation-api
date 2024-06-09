const Movie = require("../models/movie.js");
const { isValidObjectId } = require("mongoose");
const { DateTime } = require('luxon')

const listMovies = async (req, res, next) => {
  let movies = [];

  try {
    movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

const checkAvailability = async (req, res, next) => {
  const { movieId, timeSlotId } = req.params;
  let movie,
    timeSlot = {};

  if (!isValidObjectId(movieId)) {
    return res.status(400).json({ message: "Invalid movie id" });
  }
  if (!isValidObjectId(timeSlotId)) {
    return res.status(400).json({ message: "Invalid time slot id" });
  }

  try {
    movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    timeSlot = movie.timeSlots.id(timeSlotId);
    if (!timeSlot) {
      return res.status(404).json({ message: "Time Slot not found" });
    }

    res.json({ remainingCapacity: timeSlot.capacity - timeSlot.booked });
  } catch (error) {
    next(error);
  }
};

const reserveTimeSlot = async (req, res, next) => {
  const { movieId, timeSlotId } = req.params;
  const numberOfPeople = req.body.numberOfPeople;
  let movie,timeSlot = {};

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!isValidObjectId(movieId)) {
    res.status(400).json({
      message: "Invalid movie id format",
    });
  }

  if (!isValidObjectId(timeSlotId)) {
    res.status(400).json({
      message: "Invalid timeSlot id format",
    });
  }

  // if(isNaN(numberOfPeople)){
  //   res.status(400).json({
  //     message: "numberOfPeople is required and should be numeric",
  //   });
  // }

  try {
    movie = await Movie.findById(movieId);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
    }

    timeSlot = movie.timeSlots.id(timeSlotId);
    if (!timeSlot) {
      res.status(404).json({ message: "Time Slot not found" });
    }

    let remainingCapacity = timeSlot.capacity - timeSlot.booked;
    if (remainingCapacity < numberOfPeople) {
      return res.status(409).json({
        message: `${numberOfPeople} exceeds the available capacity: ${timeSlot.capacity}`,
      });
    }

    timeSlot.booked += numberOfPeople;

    const formattedTime = timeSlot.time.toLocaleString(DateTime.DATETIME_FULL);
    if (await movie.save()) {
      res.json({
        message: `Movie booked`,
      });
    } else {
      res.status(500).json({
        type: "Internal Server Error",
        message: `Could not reserve the ${timeSlot.time} slot`,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listMovies,
  checkAvailability,
  reserveTimeSlot,
};
