const  lockedSeatsModel  = require("./lockedSeats.model");
const {Op} = require("sequelize");

// to check if seat is already locked (using slot_id only or hall_id only)
exports.isLocked = async (seatData)=>{
    const isLocked = await lockedSeatsModel.findOne({where: seatData, attributes: ["lockedSeat_id"]});
    if (isLocked){
        return isLocked.dataValues;
    }else {
        return isLocked;
    }
}

// to check if seat is locked (checking using both hall and slot id) will be used when booking new seat
exports.isSeatLocked = async (slot_id, hall_id,row,column)=>{
    const isLocked = await lockedSeatsModel.findOne({where: {[Op.or]: [{slot_id}, {hall_id}], row,column}, attributes: ["lockedSeat_id"]});
    if (isLocked){
        return isLocked.dataValues;
    }else {
        return isLocked;
    }
}

// to get seats' data 
exports.getLockedSeats = async (attributes, hall_id, slot_id)=>{
    const seats = lockedSeatsModel.findAll({where: {[Op.or]: [{slot_id}, {hall_id}]}, attributes: [...attributes],raw: true});
    return seats;
}
