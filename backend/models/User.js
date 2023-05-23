const { Sequelize, DataTypes } = require("sequelize")
const db = require("../config/database")


const User = db.define(
  "User",
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
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{4,10}$/.test(
              value
            )
          ) {
            throw new Error(
              'Le mot de passe doit contenir au moins une lettre minuscule, une lette majuscule, un chiffre et un caractère spéciale et faire 10 caractères maximum"'
            )
          }
        },
      },
    },
    userDefaultImageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    dateJoined: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
)

// `sequelize.define` also returns the model
console.log(User === db.models.User) // true


//synchronisation tables
db.sync()
  .then(() => {
    console.log("synchronisation modèle&table USER OK !")
  })
  .catch((error) => {
    // Error occurred during database synchronization
    console.error("Erreur synchronisation modèle&table USER ! ", error)
  })

//exportation du modèle
module.exports = User
