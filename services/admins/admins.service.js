const  adminsModel  = require("./admins.model");

// To check if username is already exists or not
exports.isAdminExists = async (username)=>{
    const admin = await adminsModel.findOne({where:{username}});
    if (admin){
        return admin.dataValues;
    }else {
    return admin;
    }
};
// To add new cinema will be used from control panel
exports.addAdmin = async (adminData)=>{
    const admin =  await adminsModel.create(adminData);
    return admin.dataValues;
};
// To add delete specific admin, mostly used in tests
exports.deleteAdmin = async (admin_id)=>{
    const deletedAdmin = await adminsModel.destroy({where:{admin_id}});
    return deletedAdmin;
};