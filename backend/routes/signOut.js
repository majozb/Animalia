import express from 'express';

export const signOutRouter = express.Router();

signOutRouter.get('/signOut', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,    // Prevents the cookie from being accessed on the client side
    secure: process.env.NODE_ENV === 'production', // Makes the cookie only transferable over HTTPS in production
    sameSite: 'none',  // Makes the cookie available for cross-origin requests
    maxAge: 0          // Establish the cookie's expiration time to 0
  });

  res.status(200).json({ message: 'Sesión cerrada exitosamente' });
});

