const Joi = require("@hapi/joi");

const lockSeat = Joi.alternatives().try(
    Joi.object({
        row: Joi.number().required(), 
        column: Joi.number().required(), 
        hall_id: Joi.number().required(),
    }),
    Joi.object({
        row: Joi.number().required(), 
        column: Joi.number().required(), 
        slot_id: Joi.number().required(),
    }),
  );

module.exports = {
    lockSeat,
}