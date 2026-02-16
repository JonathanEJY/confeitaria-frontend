import { z } from "zod";

export const createLaborSchema = z.object({
  desiredSalary: z.number(),
  workDaysPerMonth: z.number(),
  workHoursPerDay: z.number(),

  electricity: z.number(),
  water: z.number(),
  rent: z.number(),
  wage: z.number(),
});

export type CreateLaborSchema = z.infer<typeof createLaborSchema>;
