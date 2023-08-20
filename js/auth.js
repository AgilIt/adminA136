// Fonction pour enregistrer le token dans le localStorage
export function saveToken(token) {
  localStorage.setItem('token', token);
}

// Fonction pour récupérer le token depuis le localStorage
export function getToken() {
  return localStorage.getItem('token');
}

// Fonction pour vérifier si l'utilisateur est connecté
export function isLoggedIn() {
  const token = getToken();
  return token !== null;
}

// Fonction pour déconnecter l'utilisateur
export function logout() {
  localStorage.removeItem('token');
}

// removeToken from localStorage
export function removeToken(){
  return localStorage.removeItem('token');
}