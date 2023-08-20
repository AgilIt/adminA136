// main.js

// Fonction pour vérifier si l'utilisateur est connecté
function checkUserLoggedIn() {
  const token = getToken();
  if (!token) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    window.location.href = 'login.html';
  }
}

// Fonction pour afficher la page demandée
function showPage(pageName) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    if (page.id === pageName) {
      page.style.display = 'block';
    } else {
      page.style.display = 'none';
    }
  });
}

// Gestion de la navigation entre les pages
document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si l'utilisateur est connecté (sauf pour la page de connexion et d'inscription)
  if (window.location.pathname !== '/login.html' && window.location.pathname !== '/signup.html') {
    checkUserLoggedIn();
  }

  // Écouter les clics sur les liens de navigation
  const navigationLinks = document.querySelectorAll('.nav-link');
  navigationLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const pageName = link.getAttribute('data-page');
      showPage(pageName);
    });
  });
});
