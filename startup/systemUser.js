const {addSuperAdmin} = require("../services/admins");
module.exports = async function() {
await addSuperAdmin();
};



