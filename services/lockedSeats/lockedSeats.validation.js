const Joi = require("@hapi/joi");

const lockSeats = 
    Joi.object({
        seats: Joi.array().items(
        Joi.alternatives().try(
            {
            row: Joi.number().required(), 
            column: Joi.number().required(), 
            hall_id: Joi.number().required(),
            },
            {
            row: Joi.number().required(), 
            column: Joi.number().required(), 
            slot_id: Joi.number().required(),
            }
        )).required()
    });

module.exports = {
    lockSeats,
}