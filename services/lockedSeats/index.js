const lockedSeatsModel = require("./lockedSeats.model");
const lockedSeatsRouter = require('./lockedSeats.route');
const {getLockedSeats, isSeatLocked} = require("./lockedSeats.service");
module.exports = {
    lockedSeatsModel,
    lockedSeatsRouter,
    getLockedSeats, 
    isSeatLocked
}