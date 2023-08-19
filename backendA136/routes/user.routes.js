module.exports = app => {
  const users = require('../controllers/user.controller');
  const { verifyToken } = require('../middleware/auth.middleware');

  // Créer un nouvel utilisateur
  app.post('/api/users/signup', users.signup);

  // Connecter un utilisateur
  app.post('/api/users/login', users.login);

  // Exemple de route protégée par le middleware d'authentification
  app.get('/api/users/profile', verifyToken, (req, res) => {
    // Vous pouvez accéder à l'ID de l'utilisateur à partir de req.userId
    res.status(200).send({ userId: req.userId });
  });
};
