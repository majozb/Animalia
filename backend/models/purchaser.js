import mongoose from 'mongoose';

// Define the schema for the Purchaser collection
const PurchaserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { 
    type: String, 
    required: false, 
    validator: function(v) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
    },
  },
  phone: { 
    type: String, 
    required: false,
    validate: {
      validator: function(v) {
        return /^\d{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }], // Relatioship with Pet collection
  points: { type: Number, required: false, default: 0 },
  purchases : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }] // Relatioship with Purchase collection
});

const Purchaser = mongoose.model('Purchaser', PurchaserSchema);

export default Purchaser;