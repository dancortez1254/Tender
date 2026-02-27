import { z } from 'zod';

export const LogHabitParamSchema = z.object({
  petId: z.string().transform(Number)
})

export type LogHabitParam = z.infer<typeof LogHabitParamSchema>

export const LogHabitBodySchema = z.object({
  habitId: z.string().transform(Number),
  date: z.iso.datetime(),
  note: z.string().max(200)
});

export type LogHabitBody = z.infer<typeof LogHabitBodySchema>