const { Sequelize, DataTypes } = require("sequelize")
const db = require("../config/database")

const Post = db.define(
  "post",
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
     
      references: {
        model: "User",
        key: "userId",
      },
    },
    content: {
      type: DataTypes.STRING(500),
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    dateUpdated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    usersLikes: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
    usersDislikes: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    }
    },
     {
      freezeTableName: true
    }
    );

// `sequelize.define` also returns the model
console.log(db.models.Post) // true

//synchronisation tables
db.sync()
  .then(() => {
    console.log("**Synchronisation modèle&table POST OK !**")
  })
  .catch((error) => {
    // Error occurred during database synchronization
    console.error("Erreur synchronisation modèle&table POST ! ", error)
  })

//exportation du modèle
module.exports = Post
