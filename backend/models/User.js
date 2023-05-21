const { Sequelize, DataTypes } = require("sequelize")


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
    }
  )

const User = sequelize.define(
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
    },
    userDefaultImageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
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
console.log(User === sequelize.models.User) // true

//exportation du modèle
module.exports = User
