const Joi = require("@hapi/joi");


const addSlot = Joi.object({
movie_id: Joi.number().required(),
hall_id: Joi.number().required(),
start_date: Joi.date().required(),
end_date: Joi.date().required(),
start_time: Joi.string().regex(/^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/).required(),
end_time: Joi.string().regex(/^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/).required(),
slot_status: Joi.boolean().required()
});

const toggleSlotStatus = Joi.object({
    slot_id: Joi.number().required(),
});

const getSlotSeats = Joi.object({
    slot_id: Joi.number().required(),
    hall_id: Joi.number().required(),
    reservation_date: Joi.date().required(),
});

module.exports = {
    addSlot,
    toggleSlotStatus,
    getSlotSeats
}