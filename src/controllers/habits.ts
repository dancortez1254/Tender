import { Request, Response } from 'express';
import { Habit } from '../entities/Habit.js';
import { Pet } from '../entities/Pet.js';
import { habits, habitsIdCounter } from '../models/habits.js';
import { pets } from '../models/pets.js';
import {
  CreatHabitBodySchema,
  CreateHabitParamSchema,
  ListHabitsParamSchema, ListHabitsQuerySchema
} from '../validators/habits.js';
import { getStage } from './pets.js';

export function createHabit(req: Request, res: Response): void {
  const paramResult = CreateHabitParamSchema.safeParse(req.params);
  const bodyResult = CreatHabitBodySchema.safeParse(req.body);

  if(!bodyResult.success){
    res.status(400).json({ error: bodyResult.error });
    return;
  }

  const foundPet: Pet | undefined = pets.find(pet => pet.id === paramResult.data.petId!);
  
  if(!foundPet){
    res.status(404).json({ "message": "Pet not found" });
    return;
  }

  const [stage] = getStage(foundPet, false);
  if(stage === "cooked"){
    res.status(400).json({ "message": "This pet has been cooked. Adopt a new one."});
    return;
  }
  
  const newHabit: Habit = {
    id: habitsIdCounter.value++,
    petId: paramResult.data.petId,
    name: bodyResult.data.name,
    category: bodyResult.data.category,
    targetFrequency: bodyResult.data.targetFrequency,
    statBoost: bodyResult.data.statBoost
  };

  habits.push(newHabit);
  res.status(201).json(newHabit);
}

export function listHabits(req: Request, res: Response){
  const paramResult = ListHabitsParamSchema.safeParse(req.params);
  const queryResult = ListHabitsQuerySchema.safeParse(req.query);

  const { petId } = paramResult.data;
  const { category } = queryResult.data;

  const foundPet: Pet | undefined = pets.find(pet => pet.id === petId!);
  if(!foundPet){
    res.status(404).json({ "message": "Pet not found" });
    return;
  }

  let filteredList = habits;
  filteredList = filteredList.filter(habit => habit.petId === petId!);
  
  if(category != undefined){
    filteredList = filteredList.filter(habit => habit.category === category);
  }
  res.status(200).json(filteredList);
}