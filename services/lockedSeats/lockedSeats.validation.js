const Joi = require("@hapi/joi");


const lockSeat = Joi.alternatives().try(
    Joi.object({
        seat_position: Joi.string().required(), 
        hall_id: Joi.number().required(),
    }),
    Joi.object({
        seat_position: Joi.string().required(), 
        slot_id: Joi.number().required(),
    }),
  );

module.exports = {
    lockSeat,
}