const mongoose = require('mongoose');

// Define the schema for the Purchaser collection
const PurchaserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: false, unique: true },
  phone: { type: String, required: false },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }], // Relatioship with Pet collection
  points: { type: Number, required: false, default: 0 },
  purchases : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }] // Relatioship with Purchase collection
});

const Purchaser = mongoose.model('Purchaser', PurchaserSchema);

module.exports = Purchaser;