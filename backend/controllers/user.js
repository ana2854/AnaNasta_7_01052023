//fonction login , signup + gestion du cryptage

//package de cryptage
const bcrypt = require("bcrypt")

const User = require("../models/User")

const jwt = require("jsonwebtoken")



//La fonction signup va enregistrer les nvx utilisateurs (inscription)
//cryptage du mot de passe
//prend le mess crypt va crée un new user + mail
//va enregistrer cet utilisateur dans la bdd
exports.signup = (req, res, next) => {
  console.log("connexion à la route signup"); 

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const role = req.body.role === "admin" ? "admin" : "basicUser";
      const user = new User({
        email: req.body.email,
        password: hash,
        role : role,
      })
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

//La fonction login permet de connecter les utilisateurs existants
exports.login = (req, res, next) => {
  //findOne va trouver 1 utilistateur ac mail correspondant au mail entré
  User.findOne({ where : {email: req.body.email} })
    .then((user) => {
      if (!user) {
        //si utilisateur non trouvé
        return res.status(401).json({ error: "Utilisateur non trouvé !" })
      }
      //bcypt va comparer le mdp du user qui vient de se connecter et le hash de la bdd
      bcrypt
        .compare(req.body.password, user.password)
        //boolean pr savoir si comparaison des mdp valable ou non
        .then((valid) => {
          if (!valid) {
            //si le résultat de la comparaison est différent alors
            return res.status(401).json({ error: "Mot de passe incorrect !" })
          }
          //true, renvoi une requête ok + renvoi objet json userId et token
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRETKEY, {
              expiresIn: "24h",
            }),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
