const Joi = require("@hapi/joi");

const addTicket = Joi.object({
slot_id: Joi.number().required(),
hall_id: Joi.number().required(),
row: Joi.number().required(),
column: Joi.number().required(),
reservation_date: Joi.date().required()
});

module.exports = {
    addTicket,
}