import { saveToken } from './auth.js';
import { apiBaseUrl } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const login = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${apiBaseUrl}users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username,login, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      saveToken(token);

      // Rediriger vers la page d'accueil après l'inscription
      window.location.href = 'home.html';
    } else {
      // Gérer les erreurs d'inscription
      const errorContainer = document.getElementById('error-message');
      errorContainer.textContent = 'Erreur lors de l\'inscription. Veuillez réessayer.';
    }
  });
});
