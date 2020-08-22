const adminsServices  = require("./admins.service");
const respond = require("../../helpers/respond");
const {encryptPassword, decryptPassword} = require("../../helpers/bcrypt");
const {createToken} = require("../../helpers/jwt");
const { ErrorHandler } = require("../../helpers/error");
const crypto = require("crypto");
const { adminTokenPayLoad } = require("../../helpers/tokens");

const add_admin = async (req,res,next)=>{
    try {
      let adminData = req.body;
      const isExist = await adminsServices.isAdminExists(adminData.username);
      if(isExist){
        throw new ErrorHandler(409, "username is already registered");
      } 
      const encryptedPassword = await encryptPassword(adminData.password);
      adminData.password = encryptedPassword;
      const refresh_token = crypto.randomBytes(16).toString("hex");
      adminData.refresh_token = refresh_token;
      const admin = await adminsServices.addAdmin(adminData);
      if (admin){
        delete admin.createdAt;
        delete admin.updatedAt;
        delete admin.refresh_token;
        delete admin.password;
        return respond(true,201,admin,res);
    }
    }catch(err){
        next(err);
    }
};

const signin = async (req,res,next)=>{
    try {
        const {username, password} = req.body;
        const admin = await adminsServices.isAdminExists(username);
        if(!admin){
            throw new ErrorHandler(401, "Username is not registered");
        } 
        const passwordIsSame = await decryptPassword(password,admin.password);
        if (passwordIsSame){
            delete admin.password; 
            const payLoad = adminTokenPayLoad(admin.username,admin.admin_id,"admin");
            const token = createToken(payLoad);
            return respond(true,200,{...admin,token},res);
        }
    }catch(err){
        next(err);
    }
};

module.exports = {
    add_admin,
    signin
};