import { z } from 'zod';

export const CreatHabitSchema = z.object({
  petID: z.string().transform(Number),
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  category: z.enum(['health', 'fitness', 'mindfulness', 'learning', 'social']),
  targetFrequency: z.string().min(1).max(7).transform(Number),
  statBoost: z.enum(['happiness', 'hunger', 'energy'])
});

export type CreateHabitBody = z.infer<typeof CreatHabitSchema>

export const ListHabitsParamSchema = z.object({
  petID: z.string().transform(Number),
});

export type ListHabitsParam = z.infer<typeof ListHabitsParamSchema>

export const ListHabitsQuerySchema = z.object({
  category: z.enum(['health', 'fitness', 'mindfulness', 'learning', 'social']).optional(),
});

export type ListHabitsQuery = z.infer<typeof ListHabitsQuerySchema>