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
    start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    start_time: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    end_time: {
        type: Sequelize.TIME,
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
            fields: ["start_date", "end_date", "hall_id", "start_time", "end_time"],
        },
        {
            fields: ["movie_id", "hall_id"],
        },
    ]
});

module.exports = slotsModel;
