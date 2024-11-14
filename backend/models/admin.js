import mongoose from 'mongoose';

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
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    } 
  },
	pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: false }], // Relatioship with Pet collection
});

export const Admin = mongoose.model('Admin', AdminSchema);