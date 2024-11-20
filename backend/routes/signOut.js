import express from 'express';

export const signOutRouter = express.Router();

signOutRouter.get('/signOut', (req, res) => {
  // Eliminar el token de la cookie
  res.clearCookie('token', {
    httpOnly: true,    // Impide que el token sea accesible desde el cliente
    secure: process.env.NODE_ENV === 'production', // Asegura que solo funcione en HTTPS en producción
    sameSite: 'none',  // Permite cookies en solicitudes cross-origin
    maxAge: 0          // Establece la cookie con tiempo de expiración 0 para eliminarla
  });

  // Responder con un mensaje de éxito
  res.status(200).json({ message: 'Sesión cerrada exitosamente' });
});

