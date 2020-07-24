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
        references: {    
            model: 'cinemas',
            key: 'cinema_id'
          },
    },
    left_chairs: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    right_chairs: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    center_chairs: {        
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    hall_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
}, {
    indexes: [
        {
            fields: ["cinema_id", "hall_name"],
            unique: true,
        },
    ]
});

module.exports = hallsModel;
