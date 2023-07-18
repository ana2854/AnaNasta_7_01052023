//fonction login , signup + gestion du cryptage

//package de cryptage
const bcrypt = require("bcrypt")

//importation model
const User = require("../models/User")

//token package
const jwt = require("jsonwebtoken")

// Fonction s'inscrire
exports.signup = (req, res, next) => {
  console.log("Connection route signup")

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const role = req.body.role === "admin" ? "admin" : "basic"
      const user = new User({
        email: req.body.email,
        password: hash,
        role: role,
      })
      user
        .save()
        .then(() => {
          console.log("Utilisateur crée")
          res.status(201).json({ message: "Utilisateur créé !" })
        })
        .catch((error) => {
          console.log("Erreur création user", error)
          res.status(400).json({ error })
        })
    })
    .catch((error) => {
      console.log("Erreur mot de passe pendant le hash", error)
      res.status(500).json({ error })
    })
}

// Fonction se connecter
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        console.log("Utilisateur non trouvé")
        return res.status(401).json({ error: "Utilisateur non trouvé !" })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            console.log("Mot de passe incorrect!")
            return res.status(401).json({ error: "Mot de passe incorrect !" })
          }
          console.log("Utilisateur connecté login")
          let token = jwt.sign(
            { userId: user.userId, role: user.role },
            process.env.SECRETKEY,
            { expiresIn: "24h" }
          )
          console.log("Token généré dans la fonction login function:", token)
          res.status(200).json({
            userId: user.userId,
            token: token,
            role: user.role,
          })
        })
        .catch((error) => {
          console.log("Erreur comparaison mot de passe login:", error)
          res.status(500).json({ error })
        })
    })
    .catch((error) => {
      console.log("Erreur promesse login", error)
      res.status(500).json({ error })
    })
}

exports.getOneUser = (req, res, next) => {
  User.findOne({
    where: { userId: req.params.id },
  })
    .then((user) => {
      const emailParts = user.email.split("@")
      user.email = emailParts[0]
      res.status(200).json(user)
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      })
    })
}
