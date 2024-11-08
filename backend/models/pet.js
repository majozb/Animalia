const mongoose = require('mongoose');

// Define the schema for the Pet collection
const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Purchaser', required: true }, // Relatioship with Purchaser collection
  type: { type: String, required: true },
  breed: { type: String, required: false },
  vaccines: { type: Array, required: false, default: [] },
  age: { type: Number, required: false }
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;