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

//chemin vers routes du user
app.use("/api/auth", userRoutes)

//chemin vers routes des posts
app.use("/api/post", postRoutes)

//transfert image
app.use("/images", express.static(path.join(__dirname, "images")))

app.use(helmet())


/*app.use((req, res) => {
  res.json({ message: "Connexion ok !" })
})*/
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  res.json({ message: "Connexion ok!" });
});


module.exports = app

