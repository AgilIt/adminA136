export const apiBaseUrl = 'http://localhost:3000/api/'; // Utilisez le bon port ici

// Fonction pour envoyer une requête avec un token d'authentification
async function fetchWithToken(url, options) {
  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      ...options.headers,
      'x-access-token': token
    };
  }

  const response = await fetch(apiBaseUrl + url, options);
  return response;
}

// Fonction pour effectuer la connexion
async function login(username, password) {
  const response = await fetch(apiBaseUrl + 'auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  return response.json();
}

// Fonction pour effectuer l'inscription
async function signup(username, login, password) {
  const response = await fetch(apiBaseUrl + 'auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, login, password })
  });
  return response.json();
}

// Fonction pour créer un article
async function createArticle(formData) {
  const token = localStorage.getItem('token');

  const response = await fetch(apiBaseUrl +'articles', {
    method: 'POST',
    headers: {
  
      'x-access-token': token
    },
    body: formData
  });

  return response;
}

// Vous pouvez ajouter d'autres fonctions pour récupérer des articles, etc.

// Export des fonctions pour les utiliser dans d'autres fichiers
export { login, signup, createArticle };
