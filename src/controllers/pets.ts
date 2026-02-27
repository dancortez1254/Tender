import { differenceInMilliseconds } from 'date-fns';
import { Request, Response } from 'express';
import { Pet } from '../entities/Pet.js';
import { petIdCounter, pets } from '../models/pets.js';
import { NEGLECT_THRESHOLD_MS } from '../utils/config.js';
import {
  CreatePetSchema,
  DeletePetSchema,
  GetPetIDSchema, GetPetSchema, UpdatePetNameBodySchema,
  UpdatePetNameParamSchema
} from '../validators/pets.js';

export function getStage(pet: Pet, include_emoji=true){
  if(include_emoji === true){
    if(differenceInMilliseconds(new Date(), pet.lastFedAt) > NEGLECT_THRESHOLD_MS){
      return ["cooked", "🍗"];
    }
    return ["Egg", "🥚"];
  }
  if(differenceInMilliseconds(new Date(), pet.lastFedAt) > NEGLECT_THRESHOLD_MS){
    return ["cooked"];
  }
  return ["Egg"];
}

export function createPet(req: Request, res: Response): void {
  const result = CreatePetSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const newPet: Pet = {
    id: petIdCounter.value++,
    name: result.data.name,
    species: result.data.species,
    happiness: 50,
    hunger: 50,
    energy: 50,
    lastFedAt: new Date(),
  };
  const [stage, stageEmoji] = getStage(newPet);
  pets.push(newPet);
  res.status(201).json({ newPet, "stage": stage, "stageEmoji": stageEmoji });
}

export function listPets(req: Request, res: Response): void{
  const result = GetPetSchema.safeParse(req.query);

  let filteredList = pets;

  const { species, minHappiness } = result.data;
  
  if(species != undefined){
    filteredList = filteredList.filter(pet => pet.species === species!);
  }

  if(minHappiness != undefined){
    filteredList = filteredList.filter(pet => pet.happiness >= minHappiness!);
  }

  res.status(200).json(filteredList);
}

export function getPet(req: Request, res: Response): void{
  const result = GetPetIDSchema.safeParse(req.params);

  const { petID } = result.data;

  const foundPet: Pet | undefined = pets.find(pet => pet.id === petID);

  if(!foundPet){
    res.status(404).json({ "message": "Pet not found" });
    return;
  }
  
  const [stage, stageEmoji] = getStage(foundPet);
  res.status(200).json({ foundPet, "stage": stage, "stageEmoji": stageEmoji });
}

export function updatePetName(req: Request, res: Response): void{
  const bodyResult = UpdatePetNameBodySchema.safeParse(req.body);
  if(!bodyResult.success){
    res.status(400).json({ error: bodyResult.error });
    return;
  }
  const paramResult = UpdatePetNameParamSchema.safeParse(req.params);

  const { newName } = bodyResult.data;
  const { petID } = paramResult.data;

  const foundPet: Pet | undefined = pets.find(pet => pet.id === petID);

  if(!foundPet){
    res.status(404).json({ "message": "Pet not found" });
    return;
  }

  const [stage, stageEmoji] = getStage(foundPet);
  foundPet.name = newName;
  res.status(200).json({ foundPet, "stage": stage, "stageEmoji": stageEmoji });
}

export function deletePet(req: Request, res: Response): void{
  
  const result = DeletePetSchema.safeParse(req.params);

  const { petID } = result.data;

  const foundPet: Pet | undefined = pets.find(pet => pet.id === petID);
  if(!foundPet){
    res.status(404).json({ "message": "Pet not found" });
    return;
  }

  const index = pets.indexOf(foundPet);
  pets.splice(index, 1);
  res.status(204).send();
}