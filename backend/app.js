const express = require('express');

const app = express();

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});


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
  
  





module.exports = app;