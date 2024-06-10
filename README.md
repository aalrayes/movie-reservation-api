# movie-reservation-api

Objective:

Build a simple RESTful API using Node.js, Express.js, and MongoDB to manage a movie reservation system.

Requirements:
- Movie Listing Endpoint
 An API endpoint to retrieve a list of available movies.
 Each movie should have a title and a list of available time slots with their capacities.

- Check Availability Endpoint
 An API endpoint to check the availability of a specific time slot for a movie.
 The endpoint should take the movie ID and time slot ID as parameters and return the availability (remaining capacity) for that time slot.

- Reserve Time Slot Endpoint
An API endpoint to reserve a time slot for a movie.
The endpoint should take the movie ID, time slot ID, and the number of people to reserve for.

- Ensure that the reservation does not exceed the available capacity of the time slot.

- Update the booked count for the reserved time slot.


## Before Starting 

- Install Node js 
- Install mongodb community edition or open an account in MongoDB Atlas
- install depenancies, go to the root folder and type 
```
npm install 
```

- Create a `.env` file at the root directury and add the URI to your mongo db instance 
```
DB_URI = 
```
## Getting Started
Run the server with `node ./server.js`

## Endpoints

### List All Movies
```
curl --location 'localhost:8000/v1/movies/'
```

### Check Availability
Get the `movie id` and `time slot id` from the `List All Movies` endpoint 

```
curl --location 'localhost:8000/v1/movies/<movie id>/timeslots/<time slot id>/availability'
```

### Reserve Time Slot
Get the `movie id` and `time slot id` from the `List All Movies` endpoint 

```
curl --location --request PUT 'localhost:8000/v1/movies/666721a9d2ff845183a41987/timeslots/666721a9d2ff845183a41988/reserve' \
--header 'Content-Type: application/json' \
--data '{
    "numberOfPeople": 10
}'
```