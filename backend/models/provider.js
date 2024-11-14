import mongoose from 'mongoose';

// Define the schema for the Provider collection
const ProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String, required: true, unique: true },
	password: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    } 
  },
  phone: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
	products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}], // Relatioship with Product collection
});

export const Provider = mongoose.model('Provider', ProviderSchema);