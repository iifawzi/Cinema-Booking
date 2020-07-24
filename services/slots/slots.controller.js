const slotsServices  = require("./slots.service");
const respond = require("../../helpers/respond");
const { ErrorHandler } = require("../../helpers/error");

const add_slot = async (req,res,next)=>{
    try {
    const slotData = req.body;
    const checkIfHallBusy = await slotsServices.checkIfBusy(slotData.hall_id, slotData.start_date,slotData.start_time, slotData.end_time);
    if(checkIfHallBusy){
        throw new ErrorHandler(409, "There's an slot at the entered duration");
    }
    const slot = await slotsServices.createSlot(slotData);
    if(slot){
        delete slot.updatedAt;
        delete slot.createdAt;
        return respond(true,201,slot,res);
    }
    }catch(err){
        next(err);
    }
}


module.exports = {
    add_slot,
}