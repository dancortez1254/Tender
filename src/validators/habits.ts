import { z } from 'zod';

export const CreateHabitParamSchema = z.object({
  petId: z.string().transform(Number)
});

export type CreateHabitParam = z.infer<typeof CreateHabitParamSchema>

export const CreatHabitBodySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  category: z.enum(['health', 'fitness', 'mindfulness', 'learning', 'social']),
  targetFrequency: z.string().min(1).max(7).transform(Number),
  statBoost: z.enum(['happiness', 'hunger', 'energy'])
});

export type CreateHabitBody = z.infer<typeof CreatHabitBodySchema>

export const ListHabitsParamSchema = z.object({
  petId: z.string().transform(Number),
});

export type ListHabitsParam = z.infer<typeof ListHabitsParamSchema>

export const ListHabitsQuerySchema = z.object({
  category: z.enum(['health', 'fitness', 'mindfulness', 'learning', 'social']).optional(),
});

export type ListHabitsQuery = z.infer<typeof ListHabitsQuerySchema>