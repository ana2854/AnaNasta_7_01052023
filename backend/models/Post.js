const { Sequelize, DataTypes } = require("sequelize")
const db = require("../config/database")
const User = require('./User')

const Post = db.define(
  "Post",
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
        foreignKey: "user_id",
      },
    },
    post: {
      type: DataTypes.STRING(500),
    },

    userImageUrl: {
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
    },
  },
  {
    freezeTableName: true,
  }
)

// `sequelize.define` also returns the model
console.log(Post === db.models.Post) // true

/*
//réf à la clé étrangère de la table post (clé principale de la table user)
Post.belongsTo(User, {
  foreignKey: "user_id",
})
*/
//synchronisation tables
db.sync()
  .then(() => {
    console.log("synchro ok");
  })
  .catch((error) => {
    // Error occurred during database synchronization
    console.error("erreur synchronisation ", error);
  });


//exportation du modèle
module.exports = Post
