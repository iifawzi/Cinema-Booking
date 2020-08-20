const  lockedSeatsModel  = require("./lockedSeats.model");

// to check if seat is already locked
exports.isLocked = async (seatData)=>{
    const isLocked = await lockedSeatsModel.findOne({where: seatData});
    if (isLocked){
        return isLocked.dataValues;
    }else {
        return isLocked;
    }
}
// to lock a seat
exports.lockSeat = async (seatData)=>{
    const lockedSeat = await lockedSeatsModel.create(seatData);
        return lockedSeat.dataValues;
}