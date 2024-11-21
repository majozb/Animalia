import mongoose from 'mongoose';
import validator from 'validator';

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
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  phone: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return validator.isMobilePhone(v, 'es-ES');
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
	products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false}], // Relatioship with Product collection
});

export const Provider = mongoose.model('Provider', ProviderSchema);