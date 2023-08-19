module.exports = app => {
  const articles = require('../controllers/article.controller');
  const { verifyToken } = require('../middleware/auth.middleware');

  // Créer un nouvel article
  app.post('/api/articles', verifyToken, articles.createArticle);

  // Récupérer tous les articles
  app.get('/api/articles', articles.getAllArticles);

  // Exemple de route protégée par le middleware d'authentification
  app.get('/api/articles/protected', verifyToken, (req, res) => {
    // Vous pouvez accéder à l'ID de l'utilisateur à partir de req.userId
    res.status(200).send({ userId: req.userId });
  });
};
