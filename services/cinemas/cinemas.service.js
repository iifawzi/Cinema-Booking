const  cinemasModel  = require("./cinemas.model");
const {db} = require("../../startup/db");
const Sequelize = require("sequelize");
// To check if username is already exists or not
exports.isCinemaUserExists = async (username)=>{
    const cinemaUser = await cinemasModel.findOne({where:{username}});
    if (cinemaUser){
        return cinemaUser.dataValues;
    }else {
    return cinemaUser;
    }
};
// To add new cinema will be used from control panel
exports.addCinema = async (cinemaData)=>{
    const cinema =  await cinemasModel.create(cinemaData);
    return cinema.dataValues;
};
// To add delete specific cinema, mostly used in tests
exports.deleteCinema = async (cinema_id)=>{
    const deletedCinema = await cinemasModel.destroy({where:{cinema_id}});
    return deletedCinema;
};
// Get the cinemas which has specific movie, in specific city.
exports.getCinemasForMovie = async (country,city,movie_id)=>{
    const getCinemas = await db.query("SELECT cinemas.cinema_id, cinemas.cinema_name, cinemas.contact_number,cinemas.country,cinemas.city FROM movies INNER JOIN slots ON movies.movie_id = slots.movie_id INNER JOIN halls ON halls.hall_id = slots.hall_id INNER JOIN cinemas ON cinemas.cinema_id = halls.cinema_id where cinemas.country = ? AND cinemas.city = ? AND movies.movie_id = ? AND cinemas.cinema_status = true AND halls.hall_status = true AND slots.slot_status = true", {
        replacements: [country,city, movie_id],
        type: Sequelize.QueryTypes.SELECT,
    });
    return getCinemas;
}