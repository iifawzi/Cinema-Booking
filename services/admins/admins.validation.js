const Joi = require("@hapi/joi");

const addAdmin = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
});

const signin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})



module.exports = {
    addAdmin,
    signin
}