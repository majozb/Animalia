import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // Esto carga las variables de entorno desde .env

try {
  console.log('Connecting to MongoDB server...');
  // console.log('MONGODB_URI:', process.env.MONGODB_URI);
  await connect(process.env.MONGODB_URI);
  console.log('Connection to MongoDB server established');
} catch (error) {
  console.log(error);
}