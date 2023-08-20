const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');

// Middleware pour vérifier les tokens JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
console.log('mon token =>', token);
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

// Vous pouvez ajouter d'autres fonctions de middleware liées à l'authentification, si nécessaire.
