import mongoose from 'mongoose';
import validator from 'validator';

// Define the schema for the Purchaser collection
const PurchaserSchema = new mongoose.Schema({
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
  phone: { 
    type: String, 
    required: false,
    validate: {
      validator: function(v) {
        return validator.isMobilePhone(v, 'es-ES');
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }], // Relatioship with Pet collection
  points: { type: Number, required: false, default: 0 },
  wishlist : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // Relatioship with Product collection
});

export const Purchaser = mongoose.model('Purchaser', PurchaserSchema);