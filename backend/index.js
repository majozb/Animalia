import express from 'express';
import './db/mongoose.js';
import { petRouter } from './routes/pet.js';
import { purchaserRouter } from './routes/purchaser.js';

export const app = express();
app.use(express.json());
app.use(petRouter);
app.use(purchaserRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});