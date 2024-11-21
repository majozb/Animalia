import mongoose from 'mongoose';

// Define the schema for the Product collection
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
	keywords: { type: Array, required: false, default: [] },
  dimensions: {
    type: [Number],
    validate: {
      validator: function (v) {
        return v.length === 3; // Make sure the array has exactly 3 values for length, width and height
      },
      message: props => `${props.path} should have exactly 3 values for length, width and height.`,
    },
    required: true
  },
  images: { 
    type: Array, 
    required: true, 
    validate: {
      validator: function (v) {
        return (v.length >= 0 && v.length <= 5);
      },
      message: props => `${props.path} should have at least 1 image and at most 5.`,
    },
  },
});

export const Product = mongoose.model('Product', ProductSchema);