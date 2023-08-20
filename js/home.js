import { getToken, removeToken } from './auth.js';
import { apiBaseUrl } from './api.js';

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
    console.log(articles);
    articles.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');
      articleElement.innerHTML = `
        <h2>${article.titre}</h2>
        <p>${article.contenu}</p>
       
      `;
      // <img src="data:image/png;base64,${arrayBufferToBase64(article.image.data)}" alt="Image">
      articlesContainer.appendChild(articleElement);
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des articles :', error);
  });

});

// Fonction pour convertir un ArrayBuffer en chaîne Base64
function arrayBufferToBase64(buffer) {
  console.log(buffer);
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  console.log(binary);
  return btoa(binary);
}