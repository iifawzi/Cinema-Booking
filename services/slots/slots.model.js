const Sequelize = require("sequelize");
const { db } = require("../../startup/db");

const slotsModel = db.define("slots", {
    slot_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {    
            model: 'movies',
            key: 'movie_id'
          },
          onDelete:"CASCADE" // TODO:: untill this moment, this related to the deleteMovie api which will be edited later.
    },
    hall_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {    
            model: 'halls',
            key: 'hall_id'
          },
          onDelete:"CASCADE"
    },
    ticket_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    start_time: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    end_time: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    slot_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    indexes: [
        {
            fields: ["hall_id", "start_time", "end_time"],
        },
        {
            fields: ["movie_id", "hall_id"],
        },
        {
            fields: ["slot_status"]
        }
    ]
});

module.exports = slotsModel;
