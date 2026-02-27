import { Request, Response } from 'express';
import { Habit } from '../entities/Habit.js';
import { Pet } from '../entities/Pet.js';
import { habits, habitsIdCounter } from '../models/habits.js';
import { pets } from '../models/pets.js';
import {
  CreatHabitSchema,
  ListHabitsParamSchema, ListHabitsQuerySchema
} from '../validators/habits.js';
import { getStage } from './pets.js';

export function createHabit(req: Request, res: Response): void {
  const result = CreatHabitSchema.safeParse(req.body);

  if(!result.success){
    res.status(400).json({ error: result.error });
    return;
  }

  const foundPet: Pet | undefined = pets.find(pet => pet.id === result.data.petID);
  
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
    petID: result.data.petID,
    name: result.data.name,
    category: result.data.category,
    targetFrequency: result.data.targetFrequency,
    statboost: result.data.statBoost
  };

  habits.push(newHabit);
  res.status(201).json(newHabit);
}

export function listHabits(req: Request, res: Response){
  const paramResult = ListHabitsParamSchema.safeParse(req.params);
  const queryResult = ListHabitsQuerySchema.safeParse(req.query);

  const { petID } = paramResult.data;
  const { category } = queryResult.data;

  const foundPet: Pet | undefined = pets.find(pet => pet.id === petID);
  if(!foundPet){
    res.status(404).json({ "message": "Pet not found" });
    return;
  }

  let filteredList = habits;
  filteredList = filteredList.filter(habit => habit.petID === petID!);
  
  if(category != undefined){
    filteredList = filteredList.filter(habit => habit.category === category);
  }
  res.status(200).json(filteredList);
}