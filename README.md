# adminA136

#version node utilisé
node -v : v18.16.0

#version npm utilisé
npm -v : 9.5.1

INSTRUCTION D'INSTALLATION
___________________________________________________________________
INSTALLER LA BDD

démarrer MAMP
lancer phpmyadmin
dans l'onglet 'SQL'
coller le contenu du script 'bdd_init.sq' qui se trouve dans admin136/backendA136/bdd/
___________________________________________________________________
DEMARRER LE SERVER NODE

dans le terminale, se rendre dans le dossier backednA136
command : cd backednA136

puis

npm install (pour installer les dependances du projet, à lancer qu'une seule fois)

puis 

npm start (à lancer à chaque fois que l'on voudra démarrer le server node)

___________________________________________________________________
LANCER L'APPLI

ouvrir le index.html avec live-server

___________________________________________________________________