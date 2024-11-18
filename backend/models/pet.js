import mongoose from 'mongoose';

// Define the schema for the Pet collection
const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  type: { type: String, required: true },
  breed: { type: String, required: true },
  vaccines: { type: Array, required: false, default: [] },
  birthDate: { type: Date, required: true },
  medication: { type: Array, required: false, default: [] },
  images: { 
    type: Array, 
    required: false, 
    validate: {
      validator: function (v) {
        return (v.length >= 1 && v.length <= 5); // Ensure the array has at most 5 elements and at least 1
      },
      message: props => `${props.path} should have at most 5 image and at least 1.`,
    },
  },
  genre: { type: Boolean, required: true }, // True for female, False for male
});

export const Pet = mongoose.model('Pet', PetSchema);