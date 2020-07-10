const Sequelize = require("sequelize");
const { db } = require("../../startup/db");

const moviesModel = db.define("movies", {
    movie_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    movie_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cover: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = moviesModel;