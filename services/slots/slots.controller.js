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
        const hall = getHall(['rowsNumber', 'columnsNumber'], requestData.hall_id); // get rows number and columns number for specific hall.
        const locked =  getLockedSeats(['seat_position'], requestData.hall_id, requestData.slot_id); // get all locked seats for the slot and the hall
        const corridors = getCorridors(['direction', 'corridor_number'], requestData.hall_id); // get the corridors for both directions row and column
        const tickets = getTickets(['seat_position'], requestData.slot_id, requestData.reservation_date); // get the booked seats from the tickets model
        Promise.all([hall,locked,corridors,tickets]).then(seats=>{
            const {rowsNumber, columnsNumber} = seats[0];
            const lockedSeats = seats[1].map(seat=>seat.seat_position);
            const rowsCorridors = seats[2].filter(corridor=>corridor.direction === 'row').map(rowCorridor=>rowCorridor.corridor_number);
            const columnsCorridors = seats[2].filter(corridor=>corridor.direction === 'column').map(columnCorridor=>columnCorridor.corridor_number);
            const bookedSeats = seats[3].map(seat=>seat.seat_position);
            console.log(bookedSeats);
            const letters = lettersGenerator(rowsNumber);
            const slotSeats = seatsGenerator(letters,rowsNumber,columnsNumber,rowsCorridors,columnsCorridors,bookedSeats,lockedSeats);
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