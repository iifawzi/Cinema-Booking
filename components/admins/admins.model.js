const Sequelize = require("sequelize");
const { db } = require("../../utils/db");

const admins = db.define("admins", {
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
});

module.exports = {
  adminsModel: admins,
};
