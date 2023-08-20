const db = require('../models');
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');

// Créer et enregistrer un nouvel utilisateur
exports.signup = (req, res) => {
  const { username, login, password } = req.body;
  // Vérification des champs obligatoires
  if (!username || !login || !password) {
    return res.status(400).send({ message: 'Tous les champs sont obligatoires.' });
  }

  // Hachage du mot de passe
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Création de l'utilisateur
  const user = new User({
    username: username,
    login: login,
    password: hashedPassword
  });

  // Enregistrement de l'utilisateur dans la base de données
  user.save((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    res.send({ message: 'Utilisateur enregistré avec succès.' });
  });
};

// Connecter un utilisateur
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

// Vous pouvez ajouter d'autres fonctions de contrôleur pour les mises à jour, la suppression et la récupération des utilisateurs.
