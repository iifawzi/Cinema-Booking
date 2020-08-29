const Joi = require("@hapi/joi");



const addAccount = Joi.object({
    cinema_id: Joi.number().required(),
    username: Joi.string().required(),
    password:Joi.string().required(),
    role: Joi.string().valid('csuperadmin','cadmin','cmoderator').required(),
});

module.exports = {
    addAccount,
}