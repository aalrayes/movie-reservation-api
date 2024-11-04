import { z } from "zod";
import { isValidObjectId} from "mongoose";

const checkAvailabilitySchema = z.object({
    movieId: z.string().refine((id) => isValidObjectId(id), { message: "Invalid movie ID" }),
    timeSlotId: z.string().refine((id) => isValidObjectId(id), { message: "Invalid time slot ID" }),
})

const paginationSchema = z.object({
    page: z.number().int().positive().min(1).default(1).optional(),
    limit: z.number().int().positive().min(1).max(100).default(10).optional(),
})

const reservationSchema = z.object({
    numberOfPeople: z.number().int().positive(),
})

export { checkAvailabilitySchema, paginationSchema, reservationSchema };
