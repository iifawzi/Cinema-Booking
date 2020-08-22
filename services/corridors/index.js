const corridorsModel = require("./corridors.model");
const corridorsRouter = require('./corridors.route');
const {getCorridors} = require("./corridors.service");
module.exports = {
    corridorsModel,
    corridorsRouter,
    getCorridors
}