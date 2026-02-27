import { z } from 'zod';

export const LogHabitParamSchema = z.object({
  petId: z.string().transform(Number)
});

export type LogHabitParam = z.infer<typeof LogHabitParamSchema>

export const LogHabitBodySchema = z.object({
  habitId: z.string().transform(Number),
  note: z.string().max(200).optional()
});

export type LogHabitBody = z.infer<typeof LogHabitBodySchema>