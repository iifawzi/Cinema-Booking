const Sequelize = require("sequelize");
const { db } = require("../../utils/db");

const moviesModel = db.define("movies", {
  movie_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  movie_name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  cover: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  category: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  rate: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = {
  moviesModel,
};
