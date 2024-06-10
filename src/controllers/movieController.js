const Movie = require("../models/movie.js");
const { isValidObjectId } = require("mongoose");
const { DateTime } = require("luxon");

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

  const validationError = validateAvailablityRequest(movieId, timeSlotId);

  if (validationError) {
    return res
      .status(400)
      .json({ type: "Client Error", message: validationError });
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res
        .status(404)
        .json({
          type: "Resource Not Found",
          message: `Could not find the movie with the id: ${movieId}`,
        });
    }

    const timeSlot = movie.timeSlots.id(timeSlotId);
    if (!timeSlot) {
      return res
        .status(404)
        .json({
          type: "Resource Not Found",
          message: `Could not find the time slot with the id: ${timeSlotId}`,
        });
    }

    res.json({ remainingCapacity: timeSlot.capacity - timeSlot.booked });
  } catch (error) {
    next(error);
  }
};

const reserveTimeSlot = async (req, res, next) => {
  const { movieId, timeSlotId } = req.params;
  const { numberOfPeople } = req.body;

  const validationError = validateReservationRequest(
    movieId,
    timeSlotId,
    numberOfPeople
  );

  if (validationError) {
    return res
      .status(400)
      .json({ type: "Client Error", message: validationError });
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res
        .status(404)
        .json({
          type: "Resource Not Found",
          message: `Could not find the movie with the id: ${movieId}`,
        });
    }

    const timeSlot = movie.timeSlots.id(timeSlotId);
    if (!timeSlot) {
      return res
        .status(404)
        .json({
          type: "Resource Not Found",
          message: `Could not find the time slot with the id: ${timeSlotId}`,
        });
    }

    const currentTime = new Date().getTime();
    const movieTime = new Date(timeSlot.time).getTime();

    if (currentTime > movieTime) {
      return res.status(400).json({
        type: "Client Error",
        message: `Sorry the reservation window for this movie is closed, please checkout other time slots`,
      });
    }

    let remainingCapacity = timeSlot.capacity - timeSlot.booked;
    if (remainingCapacity < numberOfPeople) {
      return res.status(409).json({
        type: "Client Error",
        message: `${numberOfPeople} exceeds the available capacity: ${timeSlot.capacity}`,
      });
    }

    timeSlot.booked += Number(numberOfPeople);

    const formattedTime = timeSlot.time.toLocaleString(DateTime.DATETIME_FULL);
    if (!(await movie.save())) {
      return res
        .status(500)
        .json({
          type: "Internal Server Error",
          message: `Could not reserve the ${formattedTime} time slot, please try again latter`,
        });
    }

    res.json({ message: `Movie booked successfully` });
  } catch (error) {
    next(error);
  }
};

const validateReservationRequest = (movieId, timeSlotId, numberOfPeople) => {
  if (!isValidObjectId(movieId)) {
    return "Invalid movie id format";
  }
  if (!isValidObjectId(timeSlotId)) {
    return "Invalid time slot id format";
  }
  if (isNaN(numberOfPeople) || numberOfPeople <= 0) {
    return "numberOfPeople is required and should be a positive integer";
  }

  return null;
};

const validateAvailablityRequest = (movieId, timeSlotId) => {
  if (!isValidObjectId(movieId)) {
    return "Invalid movie id format";
  }
  if (!isValidObjectId(timeSlotId)) {
    return "Invalid time slot id format";
  }

  return null;
};

module.exports = {
  listMovies,
  checkAvailability,
  reserveTimeSlot,
};
