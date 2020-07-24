const Joi = require("@hapi/joi");

const addHall = Joi.object({
    hall_name: Joi.string().required(),
    cinema_id: Joi.number().required(),
    hall_status: Joi.boolean().required(),
    left_chairs: Joi.number(),
    right_chairs: Joi.number(),
    center_chairs: Joi.number(),
});

module.exports = {
    addHall,
}


