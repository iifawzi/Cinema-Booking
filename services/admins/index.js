const adminsModel = require("./admins.model");
const adminsRouter = require("./admins.route");
const {addSuperAdmin} = require("./admins.service");
module.exports = {
    adminsModel,
    adminsRouter,
    addSuperAdmin
};