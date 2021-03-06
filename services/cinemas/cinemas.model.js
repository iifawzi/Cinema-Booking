const Sequelize = require("sequelize");
const { db } = require("../../startup/db");

const cinemasModel = db.define("cinemas", {
    cinema_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cinema_ar: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cinema_en: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cinema_logo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cinema_description: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    contact_number:{
        type: Sequelize.STRING,
        allowNull: false,
    },  
    area_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model:"areas", 
            key: "area_id"
        }
    },
    latitude : {
        type:Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
    },
    longitude : {
        type:Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
    },
    cinema_status : {
        type:Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    },
    last_checkout : {
        type:Sequelize.DATE,
        allowNull: false,
        defaultValue: "1999-03-20T23:00:00",
    },
}, {
    indexes: [
        {
            fields: ["cinema_status", "area_id"],
        },
        {
            fields: ["area_id"],
        }
    ]
});

module.exports = cinemasModel;