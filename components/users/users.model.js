const Sequelize = require("sequelize");
const {db} = require("../../startup/db");


const usersModel = db.define("users", {
    user_id : {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    phone_number : {
        type:Sequelize.TEXT,
        allowNull: false,
    },
    first_name : {
        type:Sequelize.TEXT,
        allowNull: false,
    },
    last_name : {
        type:Sequelize.TEXT,
        allowNull: false,
    },
    country : {
        type:Sequelize.TEXT,
        allowNull: false,
    },
    city : {
        type:Sequelize.TEXT,
        allowNull: false,
    },
    latitude : {
        type:Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
    },
    longitude : {
        type:Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
    },
    wallet : {
        type:Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});


module.exports = usersModel;