const Joi = require("@hapi/joi");

const addHall = Joi.object({
    hall_name: Joi.string().required(),
    hall_status: Joi.boolean().required(),
    left_chairs: Joi.number(),
    right_chairs: Joi.number(),
    center_chairs: Joi.number(),
});

const getHallsForMovie = Joi.object({
    cinema_id: Joi.number().required(), 
    movie_id: Joi.number().required(), 
});

const toggleHallStatus= Joi.object({
    hall_id: Joi.number().required(),
});


module.exports = {
    addHall,
    getHallsForMovie,
    toggleHallStatus
}


