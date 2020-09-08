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
    row: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }, 
    column: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }, 
    reservation_date: {
        type: Sequelize.DATE,
        allowNull: false,
    }
}, {
    indexes: [
        {
            fields: ["slot_id", "reservation_date","row", "column"],
        }
    ],
});

module.exports = ticketsModel;
