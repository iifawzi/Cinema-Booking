const  adminsModel  = require("./admins.model");
const {encryptPassword} = require("../../helpers/bcrypt");

// To check if username is already exists or not
exports.isAdminExists = async (username)=>{
    const admin = await adminsModel.findOne({where:{username}});
    if(admin){
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

exports.addSuperAdmin = async ()=>{
    const isExist = await this.isAdminExists("system");
    if(!isExist){
         await adminsModel.create({admin_id: 1,username: "system", first_name: "system", last_name: " user", role: "superadmin", password: await encryptPassword("qwaszx")});
    }
}