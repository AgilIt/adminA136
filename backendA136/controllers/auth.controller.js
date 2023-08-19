const db = require('../models');
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');

// Connexion d'un utilisateur
exports.login = (req, res) => {
  const { login, password } = req.body;

  // Recherche de l'utilisateur par le champ "login"
  User.findOne({ where: { login: login } }).then(user => {
    if (!user) {
      return res.status(404).send({ message: 'Utilisateur non trouvé.' });
    }

    // Vérification du mot de passe
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Mot de passe incorrect.' });
    }

    // Génération du token JWT
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });

    res.status(200).send({
      id: user.id,
      username: user.username,
      login: user.login,
      accessToken: token
    });
  });
};

// Vous pouvez ajouter d'autres fonctions de contrôleur pour la déconnexion ou la validation du token, selon vos besoins.
