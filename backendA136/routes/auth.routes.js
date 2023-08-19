module.exports = app => {
  const auth = require('../controllers/auth.controller');

  // Connecter un utilisateur
  app.post('/api/auth/login', auth.login);

  // Vous pouvez ajouter d'autres routes liées à l'authentification, comme la déconnexion ou la validation du token.
};
