const lockedSeatsServices  = require("./lockedSeats.service");
const respond = require("../../helpers/respond");
const { ErrorHandler } = require("../../helpers/error");
const getUniqueArray = require("../../helpers/getUniqueArray");

// will be used when making a new hall from control Panel
const lockSeats = async (req,res,next)=>{
    try {
        const seats = req.body.seats; 
        console.log(seats);
        const filteredSeats = getUniqueArray(seats, 'row', 'column'); // to delete dublications
        console.log(filteredSeats);
        const lockedSeats = await lockedSeatsServices.lockSeats(filteredSeats);
        if (lockedSeats) {
            return respond(true,201,lockedSeats,res);
        }

    }catch(err){
        next(err);
    }
}

module.exports = {
    lockSeats,
}