//création app express
const express = require("express")

const app = express()

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" })
})

const db = require("./config/database")

const userRoutes = require("./routes/user")

const postRoutes = require("./routes/post")

//dotenv
require("dotenv").config()

//importation package helmet
const helmet = require("helmet")

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





/*
//importation de sql
const mysql = require('mysql2')


const connectionToMySql = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  
  function connectionToMySqlDatabase() {
    connectionToMySql.connect((err) => {
      if (err) {
        console.error("Non connecté à la bdd mysql: ", err)
        return
      }
      console.log("Connecté à la bdd mysql")
    })
  }

  
  connectionToMySqlDatabase()
  */

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

//gestion des datas entrantes (parsed)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//chemin vers routes du user
app.use("api/auth/", userRoutes)

//chemin vers routes des posts
app.use("api/post", postRoutes)

app.use(helmet())
module.exports = app
