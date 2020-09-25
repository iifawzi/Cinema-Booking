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
});

const getHall = Joi.object({
    hall_id: Joi.number().required()
});

const updateHall = Joi.object({
    hall_id: Joi.number().required(),
    hallInfo: Joi.object({
        hall_name: Joi.string(),
        hall_status: Joi.boolean(),
        rows_number: Joi.number(),
        columns_number: Joi.number(),
        hall_description: Joi.string(),
    }).required(),

    newLockedSeats: Joi.array().items({
        row: Joi.number().required(),
        column: Joi.number().required(),
        hall_id: Joi.number().required(),
    }).required(),

    deletedLockedSeats: Joi.array().items(Joi.number()).required(),
    deletedCorridors: Joi.array().items(Joi.number()).required(),

    newCorridors: Joi.array().items({
        corridor_number: Joi.number().required(),
        direction: Joi.string().valid('row', 'column').required(),
        hall_id: Joi.number().required(),
    }).required(),

});


module.exports = {
    addHall,
    toggleHallStatus,
    deleteHall,
    getHall,
    updateHall
}


