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
        },
        onDelete: "CASCADE"
    },
    hall_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        references: {
            model: "halls", 
            key: "hall_id"
        },
        onDelete: "CASCADE"
    },
    row: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    column: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
}, 
{
    indexes: [
        {
            fields: ["slot_id","hall_id","row","column"],
        }
    ]
});


module.exports = lockedSeatsModel;