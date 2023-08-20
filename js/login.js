import { saveToken } from './auth.js';
import { apiBaseUrl } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const login = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(`${apiBaseUrl}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erreur de connexion.');
        }
      })
      .then(data => {
        const token = data.accessToken;
        saveToken(token);
      // Rediriger vers la page d'accueil après l'inscription
        window.location.href = 'home.html';
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
    });
});
