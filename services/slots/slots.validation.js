const Joi = require("@hapi/joi");


const addSlot = Joi.object({
movie_id: Joi.number().required(),
hall_id: Joi.number().required(),
ticket_price: Joi.number().required(),
start_time: Joi.date().iso().required(),
end_time: Joi.date().iso().required(),
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

// hall_id will be used if i want the slots of specific hall, otherwise get all slots of cinema.
const getSlots = Joi.object({
    hall_id: Joi.number(),
});

module.exports = {
    addSlot,
    toggleSlotStatus,
    getSlotSeats,
    getSlots
}