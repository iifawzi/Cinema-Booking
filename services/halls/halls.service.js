const { ErrorHandler } = require("../../helpers/error");
const respond = require("../../helpers/respond");
const {corridorsModel} = require("../corridors/");
const {lockedSeatsModel} = require("../lockedSeats/");
const  hallsModel  = require("./halls.model");
const {db} = require("../../startup/db");
const {Transaction} = require("sequelize");
const lockedSeats = require("../lockedSeats/");
const corridors = require("../corridors/");

// To check if hall's name exists by cinema_id: 
exports.getHallByCinemaAndName = async (cinema_id, hall_name)=>{
    const hall = await hallsModel.findOne({where:{cinema_id,hall_name}, attributes: ["hall_id"]});
    if (hall){
        return hall.dataValues;
    }else {
        return hall;
    }
};


// to get all halls of specific cinema: 
exports.getHalls = async (cinema_id)=>{
   const halls = await hallsModel.findAll({where: {cinema_id}, attributes: ['hall_id', 'hall_name', 'hall_status']});
   return halls;
}


// to get hall's data: 
exports.getHall = async (attributes, hall_id)=>{
    const hall = await hallsModel.findOne({where: {hall_id}, attributes: [...attributes]});
    if (hall){
        return hall.dataValues;
    }else {
        return hall;
    }
}

// to get hall's data using hall_id and cinema_id: 
exports.getHallByCinema = async (attributes, hall_id, cinema_id)=>{
    const hall = await hallsModel.findOne({where: {cinema_id,hall_id}, attributes: [...attributes]});
    if (hall){
        return hall.dataValues;
    }else {
        return hall;
    }
}

// to delete a hall, mostly used in tests
exports.deleteHall = async (hall_id)=>{
    const hall = await hallsModel.destroy({where: {hall_id}});
    return hall;
}


// This will be used to toggle the status of hall
exports.toggleStatus = async (hall_id)=>{
    const hall = await hallsModel.findOne({where: {hall_id}, attributes: ['hall_id', "hall_status"]});
    if(hall){
        const previousStatus = hall.hall_status;
        hall.hall_status = !previousStatus;
        hall.save();
    }
    return hall;
}


// this transaction will be used to add everything related to the hall in one chunk: 
exports.addHall = async (hallInfo,corridorsInfo,lockedSeatsInfo)=>{

    try{
        const results = await db.transaction(async (t) => {
            // Step 1 : Add hall's info.
        const hall = await hallsModel.create(hallInfo, { transaction: t });
        if (!hall){
            throw new ErrorHandler(409,"conflict when adding hall Info: => ", hall);
        };

        // Use the added hall's id in the corridors and locked Seats
        corridorsInfo.forEach((element)=> {
            element.hall_id = hall.dataValues.hall_id;
        });
        lockedSeatsInfo.forEach((element)=> {
            element.hall_id = hall.dataValues.hall_id;
        });

        // Step 2: Add Corridors: 
        const corridors = await corridorsModel.bulkCreate(corridorsInfo, { transaction: t });
        if (!corridors) {
            throw new ErrorHandler(409,"conflict when adding corridors Info: => ", corridors);
        };

        // Step 3: Add Locked Seats
        const lockedSeats = await lockedSeatsModel.bulkCreate(lockedSeatsInfo, { transaction: t });
        if (!lockedSeats){
            throw new ErrorHandler(409,"conflict when adding corridors Info: => ", lockedSeats);
        } 

       
        return {
            ...hall.dataValues,
            corridors: corridors,
            lockedSeats: lockedSeats,
        }

        });

        // When here: Data is commited.
        return results;

    }catch(err){
        // When here: Data is rolledback.
        throw new ErrorHandler(500,err);
    }

}