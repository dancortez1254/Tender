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
app.get('/pets/:petID', getPet);

import { updatePetName } from './controllers/pets.js';
app.put('/pets/:petID', updatePetName);

import { deletePet } from './controllers/pets.js';
app.delete('/pets/:petID', deletePet);

// --- Your routes will go above this line ---

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Tender listening on http://localhost:${PORT}`);
});