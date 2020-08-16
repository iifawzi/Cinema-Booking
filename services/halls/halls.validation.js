const Joi = require("@hapi/joi");

const addHall = Joi.object({
    hall_name: Joi.string().required(),
    hall_status: Joi.boolean().required(),
    left_chairs: Joi.number(),
    right_chairs: Joi.number(),
    center_chairs: Joi.number(),
    hall_description: Joi.string(),
});

const toggleHallStatus= Joi.object({
    hall_id: Joi.number().required(),
});


module.exports = {
    addHall,
    toggleHallStatus
}


