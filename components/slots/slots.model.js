const Sequelize = require("sequelize");
const { db } = require("../../startup/db");

const slotsModel = db.define("slots", {
	slot_id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	movie_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	cinema_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	hall_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	start_date: {
		type: Sequelize.DATEONLY,
		allowNull: false,
	},
	end_date: {
		type: Sequelize.DATEONLY,
		allowNull: false,
	},
	start_time: {
		type: Sequelize.TIME,
		allowNull: false,
	},
	slot_status: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
});

module.exports = {
	slotsModel,
};
