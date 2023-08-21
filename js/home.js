import { getToken, removeToken } from './auth.js';
import { apiBaseUrl } from './api.js';
import { deleteArticleService } from './gestion-article.js'

// Vérifier si l'utilisateur est connecté
const token = getToken();
if (!token) {
  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  window.location.href = 'login.html';
}


// Gérer la déconnexion
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
  removeToken();
  // Rediriger vers la page de connexion après la déconnexion
  window.location.href = 'login.html';
});

// Charger et afficher les articles depuis l'API
const articlesContainer = document.getElementById('articles-container');

document.addEventListener('DOMContentLoaded', async () => {
  fetch(apiBaseUrl + 'articles')
    .then(response => response.json())
    .then(articles => {
      articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.innerHTML = `
        <span id=${article.id} class="delete_article">X</span>
          <h2>${article.titre}</h2>
          <p>${article.contenu}</p>
        `;
        
        // Vérifier si l'article a une image
        if (article.image && article.image.data) {
          const imgElement = document.createElement('img');
          imgElement.src = `data:image/png;base64,${arrayBufferToBase64(article.image.data)}`;
          imgElement.alt = 'Image';
          articleElement.appendChild(imgElement);
        }
        
        articlesContainer.appendChild(articleElement);
      });

      const deleteBtnList = document.querySelectorAll('.delete_article');
        console.log(deleteBtnList);
        deleteBtnList.forEach((deleteBtn) =>{
        deleteBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log(event);
        const articleId = event.target.id;
        console.log(articleId);
          deleteArticleService(articleId);
        });
        });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des articles :', error);
    });
});


// Fonction pour convertir un ArrayBuffer en chaîne Base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};