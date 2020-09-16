const Joi = require("@hapi/joi");

const addCorridor = Joi.object({
    hall_id: Joi.number().required(),
    corridor_number: Joi.number().required(),
    direction: Joi.string().valid('row', 'column').required(),
});

module.exports = {
    addCorridor,
}