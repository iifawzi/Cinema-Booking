const usersModel = require("./users.model");
const usersRouter = require("./users.route");
const {deleteUser} = require("./users.service");
module.exports = {
    usersModel,
    usersRouter,
    deleteUser
};