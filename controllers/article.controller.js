const db = require('../models');
const Article = db.article;

// Créer un nouvel article
exports.createArticle = (req, res) => {
  const { iduser, titre, contenu, image } = req.body;

  // Vérification des champs obligatoires
  if (!iduser || !titre || !contenu) {
    return res.status(400).send({ message: 'Tous les champs sont obligatoires.' });
  }

  // Création de l'article
  const article = new Article({
    iduser: iduser,
    titre: titre,
    contenu: contenu,
    image: image
  });

  // Enregistrement de l'article dans la base de données
  article.save((err, article) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    res.send({ message: 'Article créé avec succès.' });
  });
};

// Récupérer tous les articles
exports.getAllArticles = (req, res) => {
  Article.findAll()
    .then(articles => {
      res.send(articles);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Une erreur s\'est produite lors de la récupération des articles.' });
    });
};

// Vous pouvez ajouter d'autres fonctions de contrôleur pour la mise à jour, la suppression et la récupération des articles.
