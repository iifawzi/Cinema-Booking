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


module.exports = {
    addMovie
};