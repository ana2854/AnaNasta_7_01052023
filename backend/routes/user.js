//importation d'express pour créer un routeur
const express = require("express")

//création du routeur ac la fonction routeur d'express
const router = express.Router()

//on associe le controleur qui est associé aux differentes routes
const userCtrl = require("../controllers/user")

//routes (method POST+ chemin, fonctions controllers)
//router.post('/signup', userCtrl.signup);

router.post("/signup", (req, res) => {
  console.log("accès à la route Signup")

  userCtrl.signup(req, res)
})

//router.post('/login', userCtrl.login);

router.post("/login", (req, res) => {
  console.log("accès à la route Login")

  userCtrl.login(req, res)
})

module.exports = router
