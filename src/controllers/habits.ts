import { Request, Response } from 'express';
import { Habit } from '../entities/Habit';
import { habitsIdCounter } from '../models/habits';
import { CreatHabitSchema } from '../validators/habits';

export function createHabit(req: Request, res: Response): void {
  const result = CreatHabitSchema.safeParse(req.body);

  if(!result.success){
    res.status(400).json({ error: result.error });
    return;
  }

  const newHabit: Habit = {
    id: habitsIdCounter.value++,
    petID: result.data.petID,
    name: result.data.name,
    category: result.data.category

  }
}