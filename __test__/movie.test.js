const request = require("supertest");
const app = require("../src/app");
const Movie = require("../src/models/movie.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { DateTime } = require("luxon");

dotenv.config();

let movieId = "";
let timeSlotId = "";

beforeAll(async () => {
  mongoose.connect(process.env.DB_URI);

  const movie = await createMockMovie()

  movieId = movie._id.valueOf()
  timeSlotId = movie.timeSlots[0]._id.valueOf()
});

afterAll(()=>{
  mongoose.connection.close()
})

test("It should response the GET method", async () => {
  const response = await request(app).get("/v1/movies");
    expect(response.statusCode).toBe(200);  
});

it("gets the check availability endpoint", async () => {
  const response = await request(app).get(`/v1/movies/${movieId}/timeslots/${timeSlotId}/availability`);

  expect(response.status).toBe(200);
  expect(response.body).toStrictEqual({
    "remainingCapacity": 30
  })
});

it("makes a movie reservation", async () => {
  const payload = {numberOfPeople: 5}
  const response = await request(app)
  .put(`/v1/movies/${movieId}/timeslots/${timeSlotId}/reserve`)
  .send(payload)
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')

  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Movie booked successfully");
});

const createMockMovie = async () =>{
  const movie = await Movie.create({
    title: "movie 0",
    timeSlots:[
      {
        time: DateTime.now().plus({days: 3}).toISO(),
        capacity: 30,
        booked: 0
      }
    ] 
  });

  return movie
}