-- Création de la base de données
CREATE DATABASE IF NOT EXISTS bddagency136 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utilisation de la base de données
USE bddagency136;

-- Création de la table "user"
CREATE TABLE IF NOT EXISTS user (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    login VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (username),
    UNIQUE (login)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Création de la table "article"
CREATE TABLE IF NOT EXISTS article (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    iduser INT(10) UNSIGNED NOT NULL,
    titre VARCHAR(250) NOT NULL,
    contenu TEXT,
    image MEDIUMBLOB,
    actif BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id),
    FOREIGN KEY (iduser) REFERENCES user(id) ON DELETE CASCADE,
    INDEX (iduser)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
