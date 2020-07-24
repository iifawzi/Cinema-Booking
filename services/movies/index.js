const moviesModel = require("./movies.model");
const moviesRouter = require("./movies.route");
const {deleteMovie} = require("./movies.service");

module.exports = {
    moviesModel,
    moviesRouter,
    deleteMovie
};