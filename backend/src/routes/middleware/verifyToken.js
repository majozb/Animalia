import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Obtaining the token from the cookies
  const token = req.cookies.token;

  // If there is no token, respond with an error
  if (!token) {
    return res.status(403).json({ error: 'Acceso denegado, no se encontró token' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token no válido o expirado' });
    }

    // If the token is valid, add the decoded information to the `req` object
    req.user = decoded;
    next(); // Pass the request to the next middleware or route
  });
};
