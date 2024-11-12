import express from 'express';
import './db/mongoose.js';
import { petRouter } from './routes/pet.js';
import { purchaserRouter } from './routes/purchaser.js';
import { providerRouter } from './routes/provider.js';
import { productRouter } from './routes/product.js';
export const app = express();

app.use(express.json());
app.use(petRouter);
app.use(purchaserRouter);
app.use(providerRouter);
app.use(productRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});