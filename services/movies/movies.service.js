const moviesModel = require("./movies.model");


// this service will be used to add a new movie (from admins' control panel)
exports.addMovie = async (data)=>{
    const movie = await moviesModel.create(data);
    return movie.dataValues;
};