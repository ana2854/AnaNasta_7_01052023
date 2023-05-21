//création app express
const express = require("express")

const app = express()

//importation package helmet
const helmet = require("helmet")

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" })
})

const userRoutes = require("./routes/user")

//dotenv
require("dotenv").config()

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
//SEQUELIZE connection BDD

//importation sequelize
const { Sequelize } = require("sequelize")

//SEQUELIZE
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
)

async function connectionToSequelizeDb() {
  try {
    await sequelize.authenticate()
    console.log("Connecté à la bdd Sequelize")
  } catch (error) {
    console.error("Non connecté à la bdd Sequelize", error)
  }
}

connectionToSequelizeDb()

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

app.use("api/auth/",userRoutes)

app.use(helmet())
module.exports = app
