# Groupomania

[Visuel du projet](frontend/doc/visuel-p7.pdf)

### Description

Groupomania est un intranet permettant aux utilisateurs de partager et liker des posts contenant du texte et des images. Les utilisateurs bénéficient d'une connexion sécurisée et continue. Un rôle d'administrateur a été intégré au système pour faciliter les tâches de modération.

### Documentation

Pour plus de détails sur les spécifications et fonctionnalités,
consulter [la documentation technique ici](backend/doc/doc-p7.pdf).

### Technologies utilisées

Backend : Node, Express, Sequelize, MySQL

Frontend: Javascript, React, CSS3

### Prérequis

- Avoir Node.js et npm installés ainsi que MySQL en cours d'exécution.

### Configuration

Fichier .env

- Renommer le fichier `env.exemple` en `.env`.

- Mettre à jour les variables d'environnement dans le fichier .env

Base de Données

- Créer une nouvelle base de données dans MySQL.

- Mettre à jour le fichier `.env` avec les informations de votre nouvelle base de données.

### Installation et utilisation

- Cloner ce dépôt

- Installer les dépendances du projet pour le frontend et le backend et démarrer les applications :

`cd frontend`  
`npm install`  
`npm run dev`

`cd backend`  
`npm install`  
`nodemon server`
