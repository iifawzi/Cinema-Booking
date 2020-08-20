const Sequelize = require("sequelize");
const { db } = require("../../startup/db");

const ticketsModel = db.define("tickets", {
    ticket_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "user_id"
        },
        onDelete: "CASCADE"
    },
    slot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "slots",
            key: "slot_id"
        },
        onDelete: "CASCADE"
    },
    seat_position: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    reservation_date: {
        type: Sequelize.DATE,
        allowNull: false,
    }
});

module.exports = ticketsModel;
