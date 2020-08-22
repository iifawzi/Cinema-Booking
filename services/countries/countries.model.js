const Sequelize = require("sequelize");
const {db} = require("../../startup/db");

const countriesModel = db.define("countries", {
    country_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    country_ar: {
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    country_en: {
        type: Sequelize.STRING, 
        allowNull: false
    }
}, 
{
    indexes: [
        {
            fields: ["country_ar", "country_en"],
        }
    ]
})

module.exports = countriesModel;