//création app express
const express = require("express")
//importation package helmet
const helmet = require("helmet")
//importation de path pour accéder au chemin de notre système de fichier
const path = require("path")
const app = express()

//const rateLimit = require('express-rate-limit')

//dotenv
require("dotenv").config()

//connexion fichier bdd
const db = require("./config/database")

const User = require("./models/User")
const Post = require("./models/Post")
const Like = require("./models/Like")

const userRoutes = require("./routes/user")

const postRoutes = require("./routes/post")


//gestion des datas entrantes (parsed)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/*
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
})


app.use(limiter)



*/
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
    console.log("Erreur synchronisation modèle&table USER", error)
  }

  try {
    await Post.sync()
    console.log("**Synchronisation modèle&table POST ok**")
  } catch (error) {
    console.log("Erreur synchronisation modèle&table POST", error)
  }

  try {
    await Like.sync()
    console.log("**Synchronisation modèle&table Like ok**")
  } catch (error) {
    console.log("Erreur synchronisation modèle&table Like", error)
  }
}
syncModels()



// CORS
app.use((req, res, next) => {
  //res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8000"
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

app.use(
  "/images",
  function (req, res, next) {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin")
    next()
  },
  express.static(path.join(__dirname, "images"))
)

module.exports = app
