const mongoose = require('mongoose');

// Define the schema for the Provider collection
const ProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String, required: true, unique: true },
	password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
	products: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}, // Relatioship with Product collection
});

const Provider = mongoose.model('Provider', ProviderSchema);

module.exports = Provider;