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
