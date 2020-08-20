const corridorsServices  = require("./corridors.service");
const respond = require("../../helpers/respond");
const { ErrorHandler } = require("../../helpers/error");

const addCorridor = async (req,res,next)=>{
    try {
        const corridorData = req.body;
        const isExist = await corridorsServices.getCorridor(corridorData);
        if (isExist) {
            throw new ErrorHandler(409, "This Corridor is already exist");
        }
        const addedCorridor = await corridorsServices.addCorridor(corridorData);
        if (addedCorridor){
            return respond(true,201,addedCorridor,res);
        }
    }catch(err){
        next(err);
    }
}

module.exports = {
    addCorridor,
}