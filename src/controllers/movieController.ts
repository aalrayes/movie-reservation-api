import MovieService from "../services/movieService.js";
import { Request, Response, NextFunction } from "express";

const listMovies = async (req: Request, res: Response, next: NextFunction) => {
  let page = parseInt(req.query.page as string);
  let limit = parseInt(req.query.limit as string);
  
  try {
    const { movies, pagination } = await MovieService.fetchMovies(page, limit);
    res.status(200).json({ movies, pagination });
  } catch (error) {
    next(error);
  }
};

const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
  const { movieId } = req.params
  try {
    const movie = await MovieService.getMovieById(movieId);
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
}

const checkAvailability = async (req: Request, res: Response, next: NextFunction) => {
  const { movieId, timeSlotId } = req.params;
  try {
    const remainingCapacity = await MovieService.getRemainingCapacity(movieId, timeSlotId);
    res.status(200).json({ remainingCapacity });
  } catch (error) {
    next(error);
  }
};

const reserveTimeSlot = async (req: Request, res: Response, next: NextFunction) => {
  const { movieId, timeSlotId } = req.params;
  const { numberOfPeople } = req.body;

  try {
    const reservation = await MovieService.bookTicket(movieId, timeSlotId, numberOfPeople);
    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};


export default { listMovies, checkAvailability, reserveTimeSlot };
