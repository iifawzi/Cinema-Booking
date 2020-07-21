
const  hallsModel  = require("./halls.model");
// To check if hall's name exists by cinema_id: 
exports.getHallByCinemaAndName = async (cinema_id, hall_name)=>{
    const hall = await hallsModel.findOne({where:{cinema_id,hall_name}});
    if (hall){
        return hall.dataValues;
    }else {
    return hall;
    }
};
// To Add a hall: 
exports.createHall = async (hallData)=>{
    const hall = await hallsModel.create(hallData);
    return hall.dataValues;
}
// to delete a hall, mostly used in tests
exports.deleteHall = async (hall_id)=>{
    const hall = await hallsModel.destroy({where: {hall_id}});
    return hall;
}