const Sequelize = require("sequelize");
const { db } = require("../../startup/db");

const cinemasModel = db.define("cinemas", {
    cinema_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cinema_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    latitude : {
        type:Sequelize.DECIMAL,
        allowNull: false,
    },
    longitude : {
        type:Sequelize.DECIMAL,
        allowNull: false,
    },
    cinema_status : {
        type:Sequelize.STRING,
        allowNull: false,
    },
    last_checkout : {
        type:Sequelize.DATE,
        allowNull: false,
    },
});

module.exports = cinemasModel;