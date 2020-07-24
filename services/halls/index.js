const hallsModel = require("./halls.model");
const hallsRouter = require("./halls.route");
const {deleteHall} = require("./halls.service");
module.exports = {
    hallsModel,
    hallsRouter,
    deleteHall
};