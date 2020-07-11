const moviesModel = require("./movies.model");


// this service will be used to add a new movie (from admins' control panel)
exports.addMovie = async (data)=>{
    const movie = await moviesModel.create(data);
    return movie.dataValues;
};

// This service will be used to delete specific movie will be used in control Panel if needed, and mostly in tests
exports.deleteMovie = async(movie_id)=>{
    const deletedMovie = await moviesModel.destroy({where: {movie_id}});
    return deletedMovie;
};