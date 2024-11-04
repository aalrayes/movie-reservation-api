import Movie from "../models/movie.js";
import NotFoundError from "../errors/notFoundError.js";
import BadRequestError from "../errors/badRequestError.js";

const fetchMovies = async (page: number = 1, limit: number = 10) => {
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(100, limit));
    
    const skip = (validPage - 1) * validLimit;
    
    const [movies, total] = await Promise.all([
        Movie.find()
            .skip(skip)
            .limit(validLimit),
        Movie.countDocuments()
    ]);

    const totalPages = Math.ceil(total / validLimit);
    const currentPage = Math.min(validPage, totalPages);

    return {
        movies,
        pagination: {
            currentPage,
            totalPages,
            totalItems: total,
            itemsPerPage: validLimit
        }
    };
}

const getRemainingCapacity = async (movieId: string, timeSlotId: string) => {
    console.log(movieId, timeSlotId);
    
    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new NotFoundError(`Could not find the movie with the id: ${movieId}`);
    }
    
    const timeSlot = movie.timeSlots.id(timeSlotId);
    if (!timeSlot) {
        throw new NotFoundError(`Could not find the time slot with the id: ${timeSlotId}`);
    }

    const remainingCapacity = timeSlot.capacity - timeSlot.booked;

    return remainingCapacity;
}

const bookTicket = async (movieId: string, timeSlotId: string, ticketCount: number) => {
    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new NotFoundError(`Could not find the movie with the id: ${movieId}`);
    }

    const timeSlot = movie.timeSlots.id(timeSlotId);
    if (!timeSlot) {
        throw new NotFoundError(`Could not find the time slot with the id: ${timeSlotId}`);
    }

    if (timeSlot.booked + ticketCount > timeSlot.capacity) {
        throw new BadRequestError(`There are not enough tickets available for the time slot: ${timeSlotId}`);
    }


    const currentTime = new Date().getTime();
    const movieTime = new Date(timeSlot.time).getTime();

    if (currentTime > movieTime) {
        throw new BadRequestError(`Sorry the reservation window for this movie is closed, please checkout other time slots`);
    }

    timeSlot.booked += ticketCount;
    await movie.save();

    return {
        message: "Ticket booked successfully",
        booking: {
            movieId,
            timeSlotId,
            ticketCount,
            showTime: timeSlot.time,
            remainingCapacity: timeSlot.capacity - timeSlot.booked,
        },
    };
}

const getMovieById = async (movieId: string) => {
    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new NotFoundError(`Could not find the movie with the id: ${movieId}`);
    }
    return movie;
}

const getTimeSlotById = async (movieId: string, timeSlotId: string) => {
    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new NotFoundError(`Could not find the movie with the id: ${movieId}`);
    }
    const timeSlot = movie.timeSlots.id(timeSlotId);
    if (!timeSlot) {
        throw new NotFoundError(`Could not find the time slot with the id: ${timeSlotId}`);
    }
    return timeSlot;
}

export default { fetchMovies, getRemainingCapacity, bookTicket, getMovieById, getTimeSlotById };