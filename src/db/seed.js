const { DateTime } = require("luxon");
const Movie = require("../models/movie.js");

async function seedDB() {
  let movies = [];

  for (let i = 0; i < 3; i++) {
    let movie = {
      title: `movie ${i}`,
      timeSlots: [
        {
          time: DateTime.now().plus({ hours: 1 }).toISO(),
          capacity: 30,
        },
        {
          time: DateTime.now().toISO(),
          capacity: 30,
        },
        {
          time: DateTime.now().plus({ hours: 3 }).toISO(),
          capacity: 30,
        },
      ],
    };

    movies.push(movie);
  }

  await Movie.collection.drop();
  await Movie.insertMany(movies);
}

module.exports = seedDB;
