const app = require("./server");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const databaseName = "test";

const dotenv =  require()

beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
});

it("gets the list movies endpoint", async done => {
    const response = await request.get("/api/v1/movies");
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("pass!");
    done();
  });

it("gets the check availablity endpoint", async done => {
const response = await request.get("/api/v1/movies/:movieId/timeslots/:timeSlot");

expect(response.status).toBe(200);
expect(response.body.message).toBe("pass!");
done();
});

it("gets the test endpoint", async done => {
const response = await request.get("/test");

expect(response.status).toBe(200);
expect(response.body.message).toBe("pass!");
done();
});