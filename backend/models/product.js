const mongoose = require('mongoose');

// Define the schema for the Product collection
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Double, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
	keywords: { type: Array, required: false, default: [] },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true } // Relatioship with Provider collection
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;