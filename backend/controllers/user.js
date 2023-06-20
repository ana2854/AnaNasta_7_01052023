
//fonction login , signup + gestion du cryptage

//package de cryptage
const bcrypt = require("bcrypt")

const User = require("../models/User")

const jwt = require("jsonwebtoken")



// Function to register new users
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

// Function to handle user login
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
          console.log("User connecté")
          res.status(200).json({
            userId: user.userId,
            token: jwt.sign({ userId: user.userId, role: user.role }, process.env.SECRETKEY, {
              expiresIn: "24h"
            }),
          })
        })
        .catch((error) => {
          console.log("Erreur comparaison mot de passe:", error)
          res.status(500).json({ error })
        })
    })
    .catch((error) => {
      console.log("Erreur promesse login", error)
      res.status(500).json({ error })
    })
}
