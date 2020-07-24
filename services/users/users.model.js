const Sequelize = require("sequelize");
const {db} = require("../../startup/db");


const usersModel = db.define("users", {
    user_id : {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    phone_number : {
        type:Sequelize.STRING,
        allowNull: false,
    },
    first_name : {
        type:Sequelize.STRING,
        allowNull: false,
    },
    last_name : {
        type:Sequelize.STRING,
        allowNull: false,
    },
    country : {
        type:Sequelize.STRING,
        allowNull: false,
    },
    city : {
        type:Sequelize.STRING,
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
    firebase_token : {
        type:Sequelize.STRING,
        allowNull: false,
    },
    refresh_token : {
        type:Sequelize.STRING,
        allowNull: false,
    },
    blocked : {
        type:Sequelize. BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    indexes: [
        {
            fields: ["phone_number"],
            unique: true,
        },
        {
            fields: ["refresh_token","user_id"],
            unique: true,
        },
    ],
});


module.exports = usersModel;