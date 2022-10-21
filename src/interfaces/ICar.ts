import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const carZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().positive().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

type ICar = z.infer<typeof carZodSchema>;

export { carZodSchema, ICar };
