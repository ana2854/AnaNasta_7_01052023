const { Sequelize, DataTypes } = require("sequelize")
const db = require("../config/database")

const Like = db.define(
  "like",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "postId"],
      },
    ],
    freezeTableName: true,
    modelName: "like",
  }
)

module.exports = Like
