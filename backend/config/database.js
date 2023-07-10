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
    timezone: "+02:00",
    dialectOptions: {
      useUTC: false, //ordonne a sequelize de se baser sur l'heure local d'sql
      dateStrings: true,//retourne la date en format string et pas objet
      typeCast: function (field, next) { 
        if (field.type === 'DATETIME') {
          return field.string()
        }
        return next()
      },
    },
  }
)
