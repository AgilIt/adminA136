const db = require('../models');
const Article = db.article;


exports.createArticle = (req, res) => {
  const { iduser, titre, contenu } = req.body; // Utilisation des données envoyées par le formulaire
  const image = req.file;

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

exports.deleteArticle = (req, res) => {
  const articleId = req.params.id;

  Article.destroy({
    where: { id: articleId }
  })
    .then(() => {
      res.status(200).send({ message: 'ok' });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Une erreur s\'est produite lors de la suppression de l\'article.' });
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
