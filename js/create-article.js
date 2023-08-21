import { getToken } from './auth.js';
import { createArticle, deleteArticle } from './api.js';

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

  const formData = new FormData(createArticleForm);
  formData.append('iduser', 1); // Remplacez par la valeur appropriée

  try {
    const res = await createArticle(formData);

    if (res.status === 201) {
      alert('Article créé avec succès !');
      window.location.href = 'home.html';
    } else {
      const data = await res.json();
      alert(`Erreur lors de la création de l'article : ${data.message}`);
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'article :', error);
  }
});


export async function deleteArticleService(articleId){

  try {
    const res = await deleteArticle(articleId);

    if (res.status === 201) {
      alert('Article supprimé avec succès !');
      window.location.href = 'home.html';
    } else {
      const data = await res.json();
      alert(`Erreur lors de la suppression de l'article : ${data.message}`);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article :', error);
  }
}
