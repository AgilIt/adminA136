const db = require('../models');
const Article = db.article;
const multer = require('multer');
const upload = multer();

// Créer un nouvel article
// Configuration de multer pour gérer les fichiers


exports.createArticle = (req, res) => {
  const { iduser, titre, contenu } = req.body; // Utilisation des données envoyées par le formulaire
  const image = req.file;

  console.log(iduser);
  console.log(titre);
  console.log(contenu);
  console.log(image);

  // Vérification des champs obligatoires
  if (!iduser || !titre || !contenu || !image) {
    return res.status(400).send({ message: 'Tous les champs sont obligatoires.' });
  }

  // Création de l'article
  const article = new Article({
    iduser: iduser,
    titre: titre,
    contenu: contenu,
    image: image.buffer
  });

  // Enregistrement de l'article dans la base de données
  article.save((err, savedArticle) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    return res.status(201).send({ message: 'Article créé avec succès', article: savedArticle });
  });
};

// Récupérer tous les articles
exports.getAllArticles = (req, res) => {
  Article.findAll()
    .then(articles => {
      res.status(201).send(articles);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Une erreur s\'est produite lors de la récupération des articles.' });
    });
};


// Vous pouvez ajouter d'autres fonctions de contrôleur pour la mise à jour, la suppression et la récupération des articles.
