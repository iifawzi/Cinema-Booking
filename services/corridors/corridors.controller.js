const corridorsServices  = require("./corridors.service");
const respond = require("../../helpers/respond");
const { ErrorHandler } = require("../../helpers/error");

const addCorridors = async (req,res,next)=>{
    try {
        const corridors = req.body.corridors;
        const addedCorridors = await corridorsServices.addCorridors(corridors);
        return respond(true,201,addedCorridors,res);
    }catch(err){
        next(err);
    }
}

module.exports = {
    addCorridors,
}