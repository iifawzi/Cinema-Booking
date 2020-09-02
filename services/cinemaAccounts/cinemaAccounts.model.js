const {db} = require("../../startup/db");
const Sequelize = require("sequelize");


const cinemaAccounts = db.define("cinemaAccounts", {
    cinemaAccount_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cinema_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            key: "cinema_id",
            model: "cinemas"
        },
        onDelete: 'CASCADE',
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.ENUM("csuperadmin",'cadmin','cmoderator'),
        allowNull: false,
    }
}, 
{
    indexes: [
        {
            fields: ["username"],
        },
        {
            fields: ["refresh_token",'cinemaAccount_id'],
        }
    ]
}
);

module.exports = cinemaAccounts;