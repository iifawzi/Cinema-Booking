const hallsServices  = require("./halls.service");
const respond = require("../../helpers/respond");
const { ErrorHandler } = require("../../helpers/error");
const getUniqueArray = require("../../helpers/getUniqueArray");
const {getLockedSeats} = require("../lockedSeats");
const {getCorridors} = require("../corridors");

const getHalls = async (req,res,next)=>{
    try {
        const cinema_id = req.requester.cinema_id;
        const halls = await hallsServices.getHalls(cinema_id);
        return respond(true,200,halls,res);
    }catch(err){
        next(err);
    }
}

const toggleHallStatus = async (req,res,next)=>{
    try {
        const {hall_id} = req.body;
        const toggleHall = await hallsServices.toggleStatus(hall_id);
        if(toggleHall){
            return respond(true,200,toggleHall,res);
        }else {
            throw new ErrorHandler(404, "Hall is not found");
        }
    }catch(err){
        next(err);
    }
}

const deleteHall = async (req,res,next)=>{
    try {
        const {hall_id} = req.body;
        const deleteHall = await hallsServices.deleteHall(hall_id);
        if (deleteHall){
            return respond(true,200,deleteHall,res);
        }else {
            throw new ErrorHandler(404, "Hall is not found");
        }
    }catch(err){
        next(err);
    }
}


// this transaction will be used to add everything related to the hall in one chunk: 
const addHall = async (req,res,next)=>{
    try {
        const {hallInfo, corridorsInfo,lockedSeatsInfo} = req.body;

        const filteredLockedSeats = getUniqueArray(lockedSeatsInfo, 'row', 'column'); // to delete dublications
        const filteredCorridors = getUniqueArray(corridorsInfo, "direction", "corridor_number"); // to delete dublications

        const cinema_id = req.requester.cinema_id;
        hallInfo.cinema_id = cinema_id;
        const isExist = await hallsServices.getHallByCinemaAndName(hallInfo.cinema_id,hallInfo.hall_name);
        if (isExist) {
            throw new ErrorHandler(409,"This name is already exist");
        }
        const addedData = await hallsServices.addHall(hallInfo, filteredCorridors,filteredLockedSeats);
        return respond(true,201,addedData,res);
    } catch (err) {
      next(err);
    }
}

// this will be used to get all of the hall's related data such as (corridors, locked seats, etc..) used for cinema's control panel
const getHall = async (req,res,next)=>{
    try {
        const {cinema_id} = req.requester;
        const {hall_id} = req.body;
        const hall = await hallsServices.getHallByCinema(['hall_name', 'hall_description','rows_number', 'columns_number', 'hall_status'], hall_id,cinema_id);
        const locked =  getLockedSeats(['row', 'column'], hall_id, -1); // get all locked seats of the hall
        const corridors = getCorridors(['direction', 'corridor_number'], hall_id); // get the corridors for both directions row and column
        Promise.all([hall,locked,corridors]).then(response=>{
            // if hall not found, it will return `null`: 
            if (!response[0]) {
                throw new ErrorHandler(404, "hall is not found");
            }
            const hall = response[0];
            const lockedSeats = response[1];
            const rowsCorridors = response[2].filter(corridor=>corridor.direction === 'row').map(rowCorridor=>rowCorridor.corridor_number);
            const columnsCorridors = response[2].filter(corridor=>corridor.direction === 'column').map(columnCorridor=>columnCorridor.corridor_number);
            hall.lockedSeats = lockedSeats;
            hall.row_corridors = rowsCorridors;
            hall.column_corridors = columnsCorridors;
            return respond(true,200,hall,res);
        }).catch(err=>{
            next(err);
        })

    }catch(err){
        next(err);
    }
}
module.exports = {
    getHalls,
    addHall,
    toggleHallStatus,
    deleteHall,
    getHall,
}