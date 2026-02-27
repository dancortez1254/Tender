import 'dotenv/config';
import express, { Express } from 'express';

const app: Express = express();

app.use(express.json());

// --- Your routes will go below this line ---
import { createPet } from './controllers/pets.js';

app.post('/pets', createPet);

import { listPets } from './controllers/pets.js';
app.get('/pets', listPets);

import { getPet } from './controllers/pets.js';
app.get('/pets/:petId', getPet);

import { updatePetName } from './controllers/pets.js';
app.put('/pets/:petId', updatePetName);

import { deletePet } from './controllers/pets.js';
app.delete('/pets/:petId', deletePet);

import { createHabit } from './controllers/habits.js';
app.post('/pets/:petId/habits', createHabit);

import { listHabits } from './controllers/habits.js';
app.get('/pets/:petId/habits', listHabits);

import { logHabit } from './controllers/logs.js';
app.post('/pets/:petId/logs', logHabit);

// --- Your routes will go above this line ---

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Tender listening on http://localhost:${PORT}`);
});