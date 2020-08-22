const hallsModel = require("./halls.model");
const hallsRouter = require("./halls.route");
const {deleteHall, getHall} = require("./halls.service");
module.exports = {
    hallsModel,
    hallsRouter,
    deleteHall,
    getHall
};