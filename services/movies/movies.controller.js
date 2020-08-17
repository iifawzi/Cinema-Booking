const moviesServices = require("./movies.service");
const respond = require("../../helpers/respond");
const addMovie = async (req,res,next)=>{
    try {
        const movieData = req.body;
        const movie = await moviesServices.addMovie(movieData);
        if (movie){
            delete movie.createdAt;
            delete movie.updatedAt;
            return respond(true,201,movie,res);
        }
    }catch(err){
        next(err);
    }
};

const deleteMovie = async (req,res,next)=>{
    try {
       const {movie_id} = req.body;
       const deleted = await moviesServices.deleteMovie(movie_id);
       return respond(true,200,deleted,res);
    }catch(err){
        next(err);
    }
};

const moviesInArea = async (req,res,next)=>{
    try {
        const {area_id} = req.body;
        const movies = await moviesServices.getMoviesInArea(area_id);
        if (movies){
            return respond(true,200,movies,res);
        }
    }catch(err){
        next(err);
    }
}

module.exports = {
    addMovie,
    deleteMovie,
    moviesInArea
};