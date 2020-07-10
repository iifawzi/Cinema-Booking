const Sequelize = require("sequelize");
const { db } = require("../../startup/db");

const hallsModel = db.define("halls", {
    hall_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    hall_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    cinema_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    chairs_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    hall_stauts: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});

module.exports = hallsModel;
