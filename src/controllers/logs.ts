import { Request, Response } from 'express';
import { Habit } from '../entities/Habit.js';
import { Log } from '../entities/Log.js';
import { Pet } from '../entities/Pet.js';
import { habits } from '../models/habits.js';
import { logIdCounter, logs } from '../models/logs.js';
import { pets } from '../models/pets.js';
import { LogHabitBodySchema, LogHabitParamSchema } from "../validators/logs.js";
import { getStage } from './pets.js';

export function logHabit(req: Request, res: Response): void{
  const bodyResult = LogHabitBodySchema.safeParse(req.body);
  const paramResult = LogHabitParamSchema.safeParse(req.params);
  
  if(!bodyResult.success){
    res.status(400).json({ error: bodyResult.error });
    return;
  }

  const foundPet: Pet | undefined = pets.find(pet => pet.id === paramResult.data.petId);

  if(!foundPet){
    res.status(404).json({ "message": "Pet not found" });
    return;
  }

  const foundHabit: Habit | undefined = habits.find(habit => habit.id === bodyResult.data.habitId);

  if(!foundHabit){
    res.status(404).json({ "message": "Habit does not belong to this pet" });
    return;
  }

  const [stage] = getStage(foundPet, false);
  if(stage === "cooked"){
    res.status(400).json({ "message": "This pet has been cooked. Adopt a new one."});
    return;
  }

  const statToBoost =  foundHabit.statBoost;

  if(statToBoost === "happiness"){
    foundPet.happiness = foundPet.happiness + 10;
  }
  else if(statToBoost === "energy"){
    foundPet.energy = foundPet.energy + 10;
  }
  else{
    foundPet.hunger = foundPet.hunger + 10;
  }

  foundPet.lastFedAt = new Date();

  const newLog: Log = {
    id: logIdCounter.value++,
    petId: paramResult.data.petId,
    habitId: bodyResult.data.habitId,
    date: (new Date()).toISOString(),
    note: bodyResult.data.note
  }

  logs.push(newLog);
  res.status(201).json(newLog);
}