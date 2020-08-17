const moviesModel = require("./movies.model");
const {db} = require("../../startup/db");
const Sequelize = require("sequelize");

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
// Get the movies which are in specific Area
exports.getMoviesInArea = async (area_id)=>{
    const getMovies = await db.query("SELECT movies.movie_id, movies.movie_name, movies.duration, movies.cover, movies.category, movies.description, movies.rate FROM movies INNER JOIN slots ON movies.movie_id = slots.movie_id INNER JOIN halls ON halls.hall_id = slots.hall_id INNER JOIN cinemas ON cinemas.cinema_id = halls.cinema_id where cinemas.area_id = ? AND cinemas.cinema_status = true AND halls.hall_status = true GROUP BY slots.movie_id", {
        replacements: [area_id],
        type: Sequelize.QueryTypes.SELECT,
    });
    return getMovies;
};