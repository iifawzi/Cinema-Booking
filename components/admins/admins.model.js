const Sequelize = require("sequelize");
const { db } = require("../../startup/db");

const adminsModel = db.define("admins", {
    admin_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    phone_number: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    first_name: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    role: {
        type: Sequelize.ENUM("admin", "superadmin"),
    },
});

module.exports = adminsModel;