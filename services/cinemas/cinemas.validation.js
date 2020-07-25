const Joi = require("@hapi/joi");


const addCinema = Joi.object({
    cinema_name: Joi.string().required(),
    username: Joi.string().required(),
    contact_number: Joi.string().required(),
    password: Joi.string().required(),
    country: Joi.string().required(), 
    city: Joi.string().required(), 
});

const signin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const getCinemas = Joi.object({
    city: Joi.string().required(),
    country: Joi.string().required(),
    movie_id: Joi.number().required(),
});

module.exports = {
    addCinema,
    signin,
    getCinemas
};