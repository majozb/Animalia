import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Purchaser} from '../models/purchaser.js';
import {Provider} from '../models/provider.js';
import {Admin} from '../models/admin.js';

export const signInRouter = express.Router();

signInRouter.post('/signIn', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find the user in each collection
    let user = await Purchaser.findOne({ user: username });
    let userType = 'purchaser';
    
    if (!user) {
      user = await Provider.findOne({ user: username });
      userType = 'provider';
     
    }
    
    if (!user) {
      user = await Admin.findOne({ user: username });
      userType = 'admin';
    }
    
    // If the user was not found in any collection
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Verifying the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Create the token with the user type
    const token = jwt.sign(
      {userId: user._id, userType },
      process.env.JWT_SECRET
    );

    // Configure the cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none'
    });

    res.status(200).json(token);
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

