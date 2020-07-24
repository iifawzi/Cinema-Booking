const hallsServices  = require("./halls.service");
const respond = require("../../helpers/respond");
const { ErrorHandler } = require("../../helpers/error");

const add_hall = async (req,res,next)=>{
    try {
        const hallData = req.body;
        const cinema_id = req.requester.cinema_id;
        hallData.cinema_id = cinema_id;
        const isExist = await hallsServices.getHallByCinemaAndName(hallData.cinema_id,hallData.hall_name);
        if (isExist) {
            throw new ErrorHandler(409,"This name is already exist");
        }
        const hall = await hallsServices.createHall(hallData);
        if (hall){
            delete hall.createdAt;
            delete hall.updatedAt;
            return respond(true,201,hall,res);
        }
    }catch(err){
        next(err);
    }
}


module.exports = {
    add_hall,
}