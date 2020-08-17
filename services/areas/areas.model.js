const Sequelize = require("sequelize");
const {db} = require("../../startup/db");

const areasModel = db.define("areas", {
    area_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'countries',
            key: 'country_id'
        }, 
        onDelete: "CASCADE"
    },
    area_ar: {
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    area_en: {
        type: Sequelize.STRING, 
        allowNull: false
    }

})

module.exports = areasModel;