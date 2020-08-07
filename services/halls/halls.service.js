const  hallsModel  = require("./halls.model");
const {db} = require("../../startup/db");
const Sequelize = require("sequelize");
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
// to Get the halls which associated with an movie for specific cinema: 
exports.hallsForMovie = async (cinema_id, movie_id)=>{
    const getHalls = await db.query("SELECT halls.hall_id, halls.hall_name FROM movies INNER JOIN slots ON movies.movie_id = slots.movie_id INNER JOIN halls ON halls.hall_id = slots.hall_id INNER JOIN cinemas ON cinemas.cinema_id = halls.cinema_id where halls.cinema_id = ? AND movies.movie_id = ? AND cinemas.cinema_status = true AND halls.hall_status = true AND slots.slot_status = true", {
        replacements: [cinema_id,movie_id],
        type: Sequelize.QueryTypes.SELECT,
    });
    return getHalls;
}