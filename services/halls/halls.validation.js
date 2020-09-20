const Joi = require("@hapi/joi");

const addHall = Joi.object({
    
    hallInfo: Joi.object({
        hall_name: Joi.string().required(),
        hall_status: Joi.boolean().required(),
        rows_number: Joi.number().required(),
        columns_number: Joi.number().required(),
        hall_description: Joi.string(),
    }).required(),

    corridorsInfo: Joi.array().items({

        corridor_number: Joi.number().required(),
        direction: Joi.string().valid('row', 'column').required(),

    }).required(),

    lockedSeatsInfo: Joi.array().items(
        Joi.alternatives().try(
            {
            row: Joi.number().required(), 
            column: Joi.number().required(), 
            },
            {
            row: Joi.number().required(), 
            column: Joi.number().required(), 
            slot_id: Joi.number().required(),
            }
        )).required()
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


