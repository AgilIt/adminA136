import { getToken } from './auth.js';
import { apiBaseUrl, createArticle } from './api.js';

// Vérifier si l'utilisateur est connecté
const token = getToken();
if (!token) {
  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  window.location.href = 'login.html';
}

// Gérer la création d'un nouvel article
const createArticleForm = document.getElementById('create-article-form');

createArticleForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const titre = event.target[0].value;
  const contenu = event.target[1].value;

  try {
    const res = await createArticle(1,titre, contenu);
    if(res.ok){
      alert('Article créé avec succès !');
    }else{
      alert('Article NON créé avec....');
    }
    // Rediriger vers la page d'accueil après la création de l'article
    window.location.href = 'home.html';
  } catch (error) {
    console.error('Erreur lors de la création de l\'article :', error);
  }
});
