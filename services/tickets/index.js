const ticketsModel = require("./tickets.model");
const ticketsRouter = require("./tickets.route");
const {getTickets} = require("./tickets.service");
module.exports = {
    ticketsModel,
    ticketsRouter,
    getTickets
};