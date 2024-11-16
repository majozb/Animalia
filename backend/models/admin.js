import mongoose from 'mongoose';
import validator from 'validator';

// Define the schema for the Admin collection
const AdminSchema = new mongoose.Schema({
	name: { type: String, required: true },
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {
    type: String, 
    required: false,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email!`
    } 
  },
	pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: false }], // Relatioship with Pet collection
});

export const Admin = mongoose.model('Admin', AdminSchema);