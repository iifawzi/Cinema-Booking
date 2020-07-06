const Sequelize = require("sequelize");
const { db } = require("../../utils/db");

const reservationsModel = db.define("reservations", {
  reservation_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  slot_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  chair_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = {
  reservationsModel,
};
