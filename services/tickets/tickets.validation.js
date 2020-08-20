const Joi = require("@hapi/joi");

const addTicket = Joi.object({
slot_id: Joi.number().required(),
seat_position: Joi.string().required(),
reservation_date: Joi.date().required()
});

module.exports = {
    addTicket,
}