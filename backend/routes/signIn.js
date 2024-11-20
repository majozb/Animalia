import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import {Purchaser} from '../models/purchaser.js';
import {Provider} from '../models/provider.js';
import {Admin} from '../models/admin.js';

export const signInRouter = express.Router();

signInRouter.post('/signIn', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Buscar al usuario en cada colección
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
    
    // Si no se encontró el usuario en ninguna colección
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Verificar la contraseña
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Crear el token con el tipo de usuario
    const token = jwt.sign(
      { _id: user._id, userType },
      process.env.JWT_SECRET
    );

    // Configurar la cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none'
    });

    res.json(token);
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

