import express from 'express';
import './db/mongoose.js';
import { Purchaser } from './models/purchaser.js';
import { Provider } from './models/provider.js';
import { Pet } from './models/pet.js';

export const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// app.use('/api/notes');

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });