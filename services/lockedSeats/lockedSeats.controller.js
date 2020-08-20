const lockedSeatsServices  = require("./lockedSeats.service");
const respond = require("../../helpers/respond");
const { ErrorHandler } = require("../../helpers/error");



const lockSeat = async (req,res,next)=>{
    try {
        const seatData = req.body; 
        if (req.body.hall_id){
            const isExist = await lockedSeatsServices.isLocked(seatData);
            if (isExist){
                throw new ErrorHandler(409, "This seat is already locked");
            }
        }else if (req.body.slot_id){
            const isExist = await lockedSeatsServices.isLocked(seatData);
            if (isExist){
                throw new ErrorHandler(409, "This seat is already locked");
            }
        }
        const lockedSeat = await lockedSeatsServices.lockSeat(seatData);
        if (lockSeat) {
            return respond(true,201,lockedSeat,res);
        }

    }catch(err){
        next(err);
    }
}

module.exports = {
    lockSeat,
}