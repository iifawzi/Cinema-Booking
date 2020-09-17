const Joi = require("@hapi/joi");

const addHall = Joi.object({
    hall_name: Joi.string().required(),
    hall_status: Joi.boolean().required(),
    rows_number: Joi.number().required(),
    columns_number: Joi.number().required(),
    hall_description: Joi.string(),
});

const toggleHallStatus= Joi.object({
    hall_id: Joi.number().required(),
});

const deleteHall = Joi.object({
    hall_id: Joi.number().required(),
})


module.exports = {
    addHall,
    toggleHallStatus,
    deleteHall
}


