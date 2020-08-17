const Joi = require("@hapi/joi");

const addArea = Joi.object({
    country_id: Joi.number().required(),
    area_ar: Joi.string().required(),
    area_en: Joi.string().required(),
});


module.exports = {
    addArea,
}