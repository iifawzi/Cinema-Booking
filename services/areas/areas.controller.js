const areasServices  = require("./areas.service");
const respond = require("../../helpers/respond");
const { ErrorHandler } = require("../../helpers/error");

const addArea = async (req,res,next)=>{
    try {
        const areaData = req.body;
        const isExist = await areasServices.getArea(areaData);
        if (isExist) {
            throw new ErrorHandler(409,"This Area is already exists");
        }
        const addedArea = await areasServices.createArea(areaData);
        if (addedArea){
            return respond(true,201,addedArea,res);
        }    
    }catch(err){
        next(err);
    }
}

const getAreas = async (req,res,next)=>{
    try {
        const areas = await areasServices.getAreas();
        if (areas){
            return respond(true,200,areas,res);
        }
    }catch(err){
        next(err);
    }
}

module.exports = {
    addArea,
    getAreas
}