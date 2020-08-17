const areasModel = require("./areas.model");
const areasRouter = require("./areas.route");
const {deleteArea} = require("./areas.service");
module.exports = {
    areasModel,
    areasRouter,
    deleteArea
}