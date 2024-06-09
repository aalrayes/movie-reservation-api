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

Update the booked count for the reserved time slot.

Technical Stack:
- Node.js
- Express.js
- MongoDB

Evaluation Criteria:
Candidates will be evaluated based on the following criteria:
- Functionality: Does the API meet the specified requirements? Are all endpoints working as expected?
- Code Quality: Is the code well-structured, modular, and easy to understand? Does it follow best practices?
- Documentation: Is there clear documentation on how to run and test the application?
- Error Handling: Does the application handle errors gracefully and provide meaningful error messages?
- Data Integrity: Ensure data consistency and integrity in MongoDB.
