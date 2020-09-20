const hallsServices  = require("./halls.service");
const respond = require("../../helpers/respond");
const { ErrorHandler } = require("../../helpers/error");
const getUniqueArray = require("../../helpers/getUniqueArray");

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

module.exports = {
    getHalls,
    addHall,
    toggleHallStatus,
    deleteHall,
}