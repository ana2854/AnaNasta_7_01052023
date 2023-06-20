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
        isEmail: {
          msg: "format invalide",
        },
        isGroupomaniaEmail(value) {
          if (!value.endsWith("@groupomania.com")) {
            throw new Error("Votre mail doit se terminer par @groupomania.com")
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Veuillez entrez un mot de passe",
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
      type: DataTypes.ENUM("admin", "basic"),
      allowNull: false,
      defaultValue: "basic",
  
    }
  },
   {
    freezeTableName: true,
    timestamps: false,
  }
  );



// `sequelize.define` also returns the model
console.log(db.models.User) // true

//synchronisation des tables
db.sync()
  .then(() => {
    console.log("**synchronisation modèle&table USER OK ** !")
  })
  .catch((error) => {
    // Erreur
    console.error("Erreur synchronisation modèle&table USER ! ", error)
  })

//exportation du modèle
module.exports = User
