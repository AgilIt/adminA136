// Importation des modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const dbConfig = require('./config/db.config'); // Importe la configuration de la base de données depuis db.config.js
// Création de l'application Express
const app = express();

// Middleware
app.use(cors()); // Gestion des autorisations CORS
app.use(bodyParser.json()); // Middleware pour analyser le corps des requêtes au format JSON
app.use(bodyParser.urlencoded({ extended: true })); // Middleware pour analyser les données d'un formulaire HTML

// Connexion à la base de données (utilise les informations du fichier .env)
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port, // Utilisez le port défini dans dbConfig
    pool: dbConfig.pool
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit();
  });


// Définition des routes
require('./routes/user.routes')(app);
require('./routes/article.routes')(app);
require('./routes/auth.routes')(app);

// Port d'écoute pour le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
