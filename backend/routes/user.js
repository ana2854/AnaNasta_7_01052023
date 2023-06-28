//importation d'express pour créer un routeur
const express = require("express")

//création du routeur ac la fonction routeur d'express
const router = express.Router()

//on associe le controleur qui est associé aux differentes routes
const userCtrl = require("../controllers/user")

// S'inscrire
router.post("/signup", (req, res) => {
  console.log("accès à la route Signup")

  userCtrl.signup(req, res)
})

//Se connecter
router.post("/login", (req, res) => {
  console.log("accès à la route Login")

  userCtrl.login(req, res)
})

//accéder à 1 utilisateur
router.get("/:id", (req, res) => {
  console.log("route accès au user")
  userCtrl.getOneUser(req, res)
})

module.exports = router
