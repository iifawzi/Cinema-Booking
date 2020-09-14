const Joi = require("@hapi/joi");

const addCorridors = Joi.object({
    corridors: Joi.array().items(
        Joi.object({
            hall_id: Joi.number().required(),
            corridor_number: Joi.number().required(),
            direction: Joi.string().valid('row', 'column').required(),
        }).required()
    ).required()
});

module.exports = {
    addCorridors,
}