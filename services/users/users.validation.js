const Joi = require("@hapi/joi");
const signup = Joi.object({
    phone_number: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    firebase_token: Joi.string().required(),
});
const signin = Joi.object({
    phone_number: Joi.string().required(),
});
const refresh_token = Joi.object({
    refresh_token: Joi.string().required(),
});

module.exports = {
    signup,
    signin, 
    refresh_token
};