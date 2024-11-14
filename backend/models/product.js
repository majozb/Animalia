import mongoose from 'mongoose';

// Define the schema for the Product collection
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
	keywords: { type: Array, required: false, default: [] },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true }, // Relatioship with Provider collection
  dimensions: {
    type: [Number], // Array de números para las dimensiones
    validate: {
      validator: function (v) {
        return v.length === 3; // Asegura que el array tenga exactamente 3 elementos
      },
      message: props => `${props.path} debe tener exactamente 3 valores para largo, ancho y alto.`,
    },
    required: true
  },
  images: { 
    type: Array, 
    required: true, 
    validate: {
      validator: function (v) {
        return (v.length >= 1 && v.length <= 5); // Asegura que el array tenga como máximo 5 elementos y al menos 1
      },
      message: props => `${props.path} debe tener como máximo 5 imágenes y al menos 1.`,
    },
  },
});

export const Product = mongoose.model('Product', ProductSchema);