const Joi = require("@hapi/joi");


const addCinema = Joi.object({
    cinema_name: Joi.string().required(),
    cinema_description: Joi.string().required(),
    cinema_logo: Joi.string().required(),
    contact_number: Joi.string().required(),
    area_id: Joi.number().required(),
});

const getCinemasForMovie = Joi.object({
    area_id: Joi.number().required(),
    movie_id: Joi.number().required(),
    date: Joi.string().required(),
});

const toggleCinemaStatus= Joi.object({
    cinema_id: Joi.number().required(),
});

module.exports = {
    addCinema,
    getCinemasForMovie, 
    toggleCinemaStatus
};