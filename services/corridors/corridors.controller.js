const corridorsServices  = require("./corridors.service");
const respond = require("../../helpers/respond");
const { ErrorHandler } = require("../../helpers/error");
const getUniqueArray = require("../../helpers/getUniqueArray");

// will be used when making the hall for the first time: 
const addCorridors = async (req,res,next)=>{
    try {
        const corridors = req.body.corridors;
        const filteredCorridors = getUniqueArray(corridors,"direction", "corridor_number");
        const addedCorridors = await corridorsServices.addCorridors(filteredCorridors);
        if (addedCorridors){
            return respond(true,201,addedCorridors,res);
        }
    }catch(err){
        next(err);
    }
}

module.exports = {
    addCorridors,
}