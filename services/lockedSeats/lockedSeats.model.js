const {db} = require("../../startup/db");
const Sequelize = require("sequelize");


const lockedSeatsModel = db.define("lockedSeats",{
    lockedSeat_id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    slot_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        references: {
            model: "slots", 
            key: "slot_id"
        }
    },
    hall_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        references: {
            model: "halls", 
            key: "hall_id"
        }
    },
    seat_position: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
});


module.exports = lockedSeatsModel;