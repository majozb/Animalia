import express from 'express';
import bcrypt from 'bcrypt';
import { Purchaser } from '../models/purchaser.js';
import jwt from 'jsonwebtoken';

export const signUpRouter = express.Router();

// Function to register a new purchaser
signUpRouter.post('/signUp', async (req, res) => {
  try {
    // Obtain the necessary data from the request body
    const { name, user, password, email, phone } = req.body;

    // Cipher the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new purchaser
    const newPurchaser = new Purchaser({
      name,
      user,
      password: hashedPassword,
      email,
      phone
    });
    console.log(newPurchaser);
    // Save the new purchaser in the database
    await newPurchaser.save();

    // Generate the JWT token
    const token = jwt.sign(
      { _id: newPurchaser._id, userType: 'purchaser' },
      process.env.JWT_SECRET, // Use your JWT secret key
      { expiresIn: '1h' } // The token will expire in 1 hour
    );

    // Store the token in a cookie (with the appropriate options)
    res.cookie('token', token, {
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // If is in production, the cookie will only be sent over HTTPS
      sameSite: 'none', // The cookie is available for cross-origin requests
      maxAge: 60 * 60 * 1000, // The token will expire in 1 hour
    });

    res.status(201).json({ message: 'Comprador registrado exitosamente' });

  } catch (error) {
    console.error("Error al registrar el comprador:", error);
    res.status(500).json({ error: 'Error al registrar el comprador' });
  }
});
