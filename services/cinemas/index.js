const cinemasModel = require("./cinemas.model");
const cinemasRouter = require("./cinemas.route");
const {deleteCinema} = require("./cinemas.service");
module.exports = {
    cinemasModel,
    cinemasRouter,
    deleteCinema
};