const  corridorsModel  = require("./corridors.model");

// to get the corridor data mostly used to check if already exists when attempt to add a new corridor: 
exports.getCorridor = async (corridorData)=>{
    const corridor = await corridorsModel.findOne({where: corridorData});
    if (corridor){
        return corridor.dataValues
    }else {
        return corridor;
    }
}
// to add a new corridor
exports.addCorridor = async(corridorData)=>{
    const addedCorridor = await corridorsModel.create(corridorData);
    return addedCorridor;
}