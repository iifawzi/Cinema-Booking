const  cinemasModel  = require("./cinemas.model");

// To check if username is already exists or not
exports.isCinemaUserExists = async (username)=>{
    const cinemaUser = await cinemasModel.findOne({where:{username}});
    return cinemaUser;
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