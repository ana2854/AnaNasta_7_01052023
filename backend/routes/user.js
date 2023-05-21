//importation d'express pour créer un routeur 
const express = require('express');

//création du routeur ac la fonction routeur d'express
const router = express.Router();

//on associe le controleur qui est associé aux differentes routes 
const userCtrl = require('../controllers/user');

//routes (method POST+ chemin, fonctions controllers)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;