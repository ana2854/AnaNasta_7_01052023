//création app express
const express = require("express")
//importation package helmet
const helmet = require("helmet")
//importation de path pour accéder au chemin de notre système de fichier
const path = require("path")
const app = express()

//dotenv
require("dotenv").config()

//connexion fichier bdd
const db = require("./config/database")

const User = require("./models/User")
const Post = require("./models/Post")

const userRoutes = require("./routes/user")

const postRoutes = require("./routes/post")

//TEST DB SEQUELIZE
async function connectionToSequelizeDb() {
  try {
    await db.authenticate()
    console.log("Connecté à la bdd Sequelize")
  } catch (error) {
    console.error("Non connecté à la bdd Sequelize", error)
  }
}

connectionToSequelizeDb()

//importation associations des modèles
require("./models/associations")

//synchronisation models
async function syncModels() {
  try {
    await User.sync()
    console.log("**Synchronisation des modèle&table USER OK**")
  } catch (error) {
    console.log("**Erreur synchronisation modèle&table USER**", error)
  }

  try {
    await Post.sync()
    console.log("**Synchronisation modèle&table POST ok**")
  } catch (error) {
    console.log("Erreur synchronisation modèle&table POST", error)
  }
}
syncModels()

//gestion des datas entrantes (parsed)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  )
  next()
})

app.use(helmet())

app.use((req, res, next) => {
  console.log("connexion entrante:", req.method, req.url)
  next()
})

//Routes USER (human)
app.use("/api/auth", userRoutes)

//Routes POSTS (message)
app.use("/api/post", postRoutes)

//transfert image
app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app
