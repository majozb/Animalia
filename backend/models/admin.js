const mongoose = require('mongoose');

// Define the schema for the Admin collection
const AdminSchema = new mongoose.Schema({
	name: { type: String, required: true },
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
	pets: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: false }, // Relatioship with Pet collection
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;