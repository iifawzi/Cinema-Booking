const {db} = require("../../startup/db");
const Sequelize = require("sequelize");


const corridorsModel = db.define("corridors",{
    corridor_id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hall_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "halls", 
            key: "hall_id"
        },
        onDelete: "CASCADE"
    },
    direction: {
        type: Sequelize.ENUM("row", "column"),
        allowNull: false
    },
    corridor_number: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
}, 
{
    indexes: [
        {
            fields: ["hall_id","corridor_number","direction"],
            unique: true,
        }
    ]
});


module.exports = corridorsModel;