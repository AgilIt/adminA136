const multer = require('multer');

// Configuration de multer pour gérer les fichiers
const storage = multer.memoryStorage(); // Stocker les fichiers en mémoire
const upload = multer({ storage: storage });

module.exports = app => {
  const articles = require('../controllers/article.controller');
  const { verifyToken } = require('../middleware/auth.middleware');

  // Créer un nouvel article en utilisant FormData
  app.post('/api/articles', verifyToken, upload.single('image'), (req, res) => {
    articles.createArticle(req, res);
  });

  // Récupérer tous les articles
  app.get('/api/articles', articles.getAllArticles);

  app.delete('/api/articles/:id', verifyToken, (req, res) => {
    articles.deleteArticle(req, res);
  });

  // Exemple de route protégée par le middleware d'authentification
  app.get('/api/articles/protected', verifyToken, (req, res) => {
    // Vous pouvez accéder à l'ID de l'utilisateur à partir de req.userId
    res.status(200).send({ userId: req.userId });
  });
};
