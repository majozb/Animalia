import express from 'express';
import cokkieParser from 'cookie-parser';
import './db/mongoose.js';
import { petRouter } from './routes/pet.js';
import { purchaserRouter } from './routes/purchaser.js';
import { providerRouter } from './routes/provider.js';
import { productRouter } from './routes/product.js';
import { adminRouter } from './routes/admin.js';
import { signInRouter } from './routes/signIn.js';
import { signUpRouter } from './routes/signUp.js';
import { signOutRouter } from './routes/signOut.js';
import { verifyToken } from './routes/middleware/verifyToken.js';
import { Provider } from './models/provider.js';
import cors from 'cors';
export const app = express();

app.use(express.json());
app.use(cokkieParser());
app.use(cors());
app.use(petRouter);
app.use(purchaserRouter);
app.use(providerRouter);
app.use(productRouter);
app.use(adminRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

// Ruta protegida para obtener la información del usuario
app.get('/user-info', verifyToken, async (req, res) => {
    try {
      const userId = req.user._id; // _id es parte del payload del token
      const userType = req.user.userType;
  
      res.status(200).json({ userId, userType });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la información del usuario' });
    }
  });
  
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});