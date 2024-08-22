import { z } from "zod";

const createBikeRentalValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    bikeId: z.string(),
    startTime: z.string().datetime(),
    returnTime: z.string().datetime().optional(),
    totalCost: z.number().optional(),
    isReturned: z.boolean().optional(),
  }),
});

export const BikeRentalValidation = {
  createBikeRentalValidationSchema,
};
