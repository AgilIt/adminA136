const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');

// Middleware pour vérifier les tokens JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ message: 'Aucun token fourni.' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Non autorisé.' });
    }
    req.userId = decoded.id;
    next();
  });
};
