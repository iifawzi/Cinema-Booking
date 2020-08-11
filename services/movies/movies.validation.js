const Joi = require("@hapi/joi");


const addMovie = Joi.object({
    movie_name: Joi.string().required(),
    cover: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    rate: Joi.number().required(),
    duration: Joi.string().required()
});

const moviesInCity = Joi.object({
    city: Joi.string().required(),
    country: Joi.string().required(),
});

const deleteMovie = Joi.object({
   movie_id: Joi.number().required(),
});

module.exports = {
    addMovie,
    deleteMovie,
    moviesInCity
};