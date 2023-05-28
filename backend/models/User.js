const { Sequelize, DataTypes } = require("sequelize")
const db = require("../config/database")

const User = db.define(
  "user",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isPasswordValid(value) {
          if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{4,50}$/.test(
              value
            )
          ) {
            throw new Error(
              'Le mot de passe doit contenir au moins une lettre minuscule, une lette majuscule, un chiffre et un caractère spéciale et faire 50 caractères maximum'
            )
          }
        },
      },
    },
    userDefaultImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    dateJoined: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "appUser",
    },
  },
  {
    tableName :"user",
    modelName: "User",
    underscored:false,
    freezeTableName: true,
  }
)

// `sequelize.define` also returns the model
console.log(db.models.User) // true


/*
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


// verif tables presents ou pas
async function checkTables() {
  try {
    await db.authenticate();
    console.log('connexion réussie.');

    const tableNames = ['post']; // Update with your table names

    const tablePromises = tableNames.map(async (tableName) => {
      const tableExists = await db.getQueryInterface().showAllTables();
      if (tableExists.includes(tableName.toLowerCase())) {
        console.log(`Table '${tableName}' existe.`);
      } else {
        console.log(`Table '${tableName}' n'existe pas.`);
      }
    });

    await Promise.all(tablePromises);
  } catch (error) {
    console.error('impossible de se connecter à la db:', error);
  } finally {
    await db.close();
    console.log('Connection closed.');
  }
}

// Call the function to check tables
checkTables();


//xxxxxxxxxxxxxxxxxxxxxxxxxx
*/


//creation user :  
db.sync({ alter: true })
  .then(() => {
   const newUser = User.build({email: 'hello1@gmail.com'})
   console.log(newUser);
    
  })
  .catch((error) => {
    // Erreur
    console.error("Erreur création user! ", error)
  })


  /*
  //synchronisation des tables
db.sync({force:true})
  .then(() => {
   
    console.log("synchronisation modèle&table USER OK !")
  })
  .catch((error) => {
    // Error occurred during database synchronization
    console.error("Erreur synchronisation modèle&table USER ! ", error)
  })
  */

//exportation du modèle
module.exports = User
