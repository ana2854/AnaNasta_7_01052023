//création app express
const express = require('express');

const app = express();

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

//dotenv
require('dotenv').config()

//importation sequelize
const { Sequelize } = require("sequelize")

//importation de sql
const mysql2 = require("mysql2")

//connection à la database mysql


// MYSQL
/*
const connectionToMySql = mysql2.createConnection({
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


module.exports = app;