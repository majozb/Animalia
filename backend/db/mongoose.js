import { connect } from 'mongoose';

try {
  console.log('Connecting to MongoDB server...');
  // console.log('MONGODB_URI:', process.env.MONGODB_URI);
  await connect(process.env.MONGODB_URI);
  console.log('Connection to MongoDB server established');
} catch (error) {
  console.log(error);
}