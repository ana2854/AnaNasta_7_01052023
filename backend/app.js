//création app express
const express = require('express');

const app = express();

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

//importation sequelize
const { Sequelize } = require("sequelize")


//importation de sql
const mysql2 = require("mysql2")

//connection à la database mysql


// MYSQL
const connectionToMySql = mysql2.createConnection({
    host: "localhost",
    user: "groupomania_admin",
    password: "yxAi9mSgAD4O",
    database: "groupomania",
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
  
  //SEQUELIZE connection BDD

  //SEQUELIZE
const sequelize = new Sequelize(
    "groupomania",
    "groupomania_admin",
    "yxAi9mSgAD4O",
    {
      host: "localhost",
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