import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Obtener el token de las cookies
  const token = req.cookies.token;

  // Si no hay token, responder con un error
  if (!token) {
    return res.status(403).json({ error: 'Acceso denegado, no se encontró token' });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token no válido o expirado' });
    }

    // Si el token es válido, añadir la información decodificada al objeto `req`
    req.user = decoded;
    next(); // Pasar al siguiente middleware o ruta
  });
};
