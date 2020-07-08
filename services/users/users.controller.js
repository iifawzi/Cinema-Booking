const {ErrorHandler} = require("../../helpers/error");
const respond = require("../../helpers/respond");
const userService = require("./users.service");
const {createToken} = require("../../helpers/jwt");
const crypto = require("crypto");
// For adding new User: 
const signup = async (req,res,next)=>{
    try {
        const userData = req.body;
        const userExist = await userService.checkIfPhoneExists(userData.phone_number);
        if (userExist){
            throw new ErrorHandler(409, "Phone number is already registered");
        }
        const refresh_token = crypto.randomBytes(16).toString("hex");
        userData.refresh_token = refresh_token;
        const createdUser = await userService.createNewUser(userData);
        if (createdUser){
            const tokenPayload = {
                phone_number: createdUser.phone_number,
                user_id: createdUser.user_id,
            };
            const token = createToken(tokenPayload);
            return respond(true,201,{...createdUser,token},res);
        }
    }catch(err) {
        next(err);
    }
};


module.exports = {
    signup,
};