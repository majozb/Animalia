import express from 'express';
import bcrypt from 'bcrypt';
import { Purchaser } from '../models/purchaser.js'; // Asegúrate de importar el modelo de Purchaser
import jwt from 'jsonwebtoken';

export const signUpRouter = express.Router();

// Función para registrar un comprador
signUpRouter.post('/signUp', async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { name, user, password, email, phone } = req.body;

    // Cifrar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el nuevo comprador
    const newPurchaser = new Purchaser({
      name,
      user,
      password: hashedPassword,
      email,
      phone
    });
    console.log(newPurchaser);
    // Guardar al comprador en la base de datos
    await newPurchaser.save();

    // Generar el token JWT
    const token = jwt.sign(
      { _id: newPurchaser._id, userType: 'purchaser' },
      process.env.JWT_SECRET, // Usa tu clave secreta de JWT
      { expiresIn: '1h' } // El token expira en 1 hora
    );

    // Almacenar el token en una cookie (con las opciones adecuadas)
    res.cookie('token', token, {
      httpOnly: true, // Evita que JavaScript acceda a la cookie
      secure: process.env.NODE_ENV === 'production', // Si está en producción, usar HTTPS
      sameSite: 'none', // Necesario si usas cookies en cross-origin requests
      maxAge: 60 * 60 * 1000, // El token expirará después de 1 hora
    });

    res.status(201).json({ message: 'Comprador registrado exitosamente' });

  } catch (error) {
    console.error("Error al registrar el comprador:", error);
    res.status(500).json({ error: 'Error al registrar el comprador' });
  }
});
