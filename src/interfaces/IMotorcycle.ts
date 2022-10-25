import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const motorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().lte(2500),
});

export type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

// export { motorcycleZodSchema, IMotorcyle };
