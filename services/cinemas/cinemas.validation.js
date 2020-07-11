const Joi = require("@hapi/joi");


const addCinema = Joi.object({
    cinema_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    country: Joi.string().required(), 
    city: Joi.string().required(), 
});

module.exports = {
    addCinema,
};