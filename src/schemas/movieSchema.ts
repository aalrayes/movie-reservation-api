import { z } from "zod";

const movieSchema = z.object({
    title: z.string().min(1),
    timeSlots: z.array(z.object({
        time: z.string().datetime(),
        capacity: z.number().int().positive(),
    })),
})

export default movieSchema;