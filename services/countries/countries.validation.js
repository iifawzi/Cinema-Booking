const Joi = require("@hapi/joi");

const addCountry = Joi.object({
    country_ar: Joi.string().required(),
    country_en: Joi.string().required(),
});


module.exports = {
    addCountry,
}