const slotsServices  = require("./slots.service");
const respond = require("../../helpers/respond");
const lettersGenerator = require("../../helpers/letters");
const seatsGenerator = require("../../helpers/seats");
const { ErrorHandler } = require("../../helpers/error");
const {getHall} = require("../halls");
const {getLockedSeats} = require("../lockedSeats");
const {getCorridors} = require("../corridors");
const {getTickets} = require("../tickets");
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

const toggleSlotStatus = async (req,res,next)=>{
    try {
        const {slot_id} = req.body;
        const toggleSlot = await slotsServices.toggleStatus(slot_id);
        if(toggleSlot){
            return respond(true,200,toggleSlot,res);
        }else {
            throw new ErrorHandler(404, "Slot is not found");
        }
    }catch(err){
        next(err);
    }
}

const getSlotSeats = async (req,res,next)=>{ // it's not tested in the slots service, the last function wchich is slotSeats is tested using stress test
    try {
        const requestData = req.body;
        const hall = getHall(['rows_number', 'columns_number'], requestData.hall_id); // get rows number and columns number for specific hall.
        const locked =  getLockedSeats(['row', 'column'], requestData.hall_id, requestData.slot_id); // get all locked seats for the slot and the hall
        const corridors = getCorridors(['direction', 'corridor_number'], requestData.hall_id); // get the corridors for both directions row and column
        const tickets = getTickets(['row', 'column'], requestData.slot_id, requestData.reservation_date); // get the booked seats from the tickets model
        Promise.all([hall,locked,corridors,tickets]).then(response=>{
            // if hall not found, it will return `null`: 
            if (!response[0]) {
                throw new ErrorHandler(404, "hall is not found");
            }
            const {rows_number, columns_number} = response[0];
            const lockedSeats = response[1];
            const rowsCorridors = response[2].filter(corridor=>corridor.direction === 'row').map(rowCorridor=>rowCorridor.corridor_number);
            const columnsCorridors = response[2].filter(corridor=>corridor.direction === 'column').map(columnCorridor=>columnCorridor.corridor_number);
            const bookedSeats = response[3];

            const letters = lettersGenerator(rows_number);
            const slotSeats = seatsGenerator(letters,rows_number,columns_number,rowsCorridors,columnsCorridors,bookedSeats,lockedSeats);
            return respond(true,200,slotSeats,res);
        }).catch(err=>{
            next(err);
        })
    }catch(err){
        next(err);
    }
}


module.exports = {
    add_slot,
    toggleSlotStatus, 
    getSlotSeats
}