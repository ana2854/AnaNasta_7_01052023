//DATABASE IDS

require("dotenv").config()
//importation sequelize
const { Sequelize } = require("sequelize")

//SEQUELIZE

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      timezone: "+02:00",
    },
  }
)
