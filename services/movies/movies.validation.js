const Joi = require("@hapi/joi");


const addMovie = Joi.object({
    movie_name: Joi.string().required(),
    cover: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    rate: Joi.number().required(),
});


module.exports = {
    addMovie,
};