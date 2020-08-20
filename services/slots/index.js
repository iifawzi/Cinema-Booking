const slotsModel = require("./slots.model");
const slotsRouter = require("./slots.route");
const {deleteSlot} = require("./slots.service");
module.exports = {
    slotsModel,
    slotsRouter,
    deleteSlot
};