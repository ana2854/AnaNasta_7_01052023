const { Sequelize, DataTypes } = require("sequelize")
const db = require("../config/database")
const User = require("./User")

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
        model: User,
        key: "userId",
      },
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,

    },
    dateUpdated: {
      type: DataTypes.DATE,
      allowNull: false,

    },
   
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "dateCreated",
    updatedAt: "dateUpdated",
    modelName: "post",
  }
)

// `sequelize.define` also returns the model
console.log(Post === db.models.post);// true


//exportation du modèle
module.exports = Post
