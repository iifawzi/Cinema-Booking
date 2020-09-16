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
        defaultValue: null,
        references: {
            model: "halls", 
            key: "hall_id"
        },
        onDelete: "CASCADE"
    },
    direction: {
        type: Sequelize.ENUM("row", "column"),
        defaultValue: null,
    },
    corridor_number: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
}, 
{
    indexes: [
        {
            fields: ["hall_id","corridor_number","direction"]
        }
    ]
});


module.exports = corridorsModel;