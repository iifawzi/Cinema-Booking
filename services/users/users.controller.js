const {ErrorHandler} = require("../../helpers/error");
const respond = require("../../helpers/respond");
const userService = require("./users.service");
const jwt = require("../../helpers/jwt");
const signup = async (req,res,next)=>{
    try {
        const userData = req.body;
        const userExist = await userService.checkIfPhoneExists(userData.phone_number);
        if (userExist){
            throw new ErrorHandler(409, "Phone number already registered");
        }
        const createdUser = await userService.createNewUser(userData);
        if (createdUser){
            const tokenPayload = {
                phone_number: createdUser.phone_number,
                user_id: createdUser.user_id,
            };
            const token = jwt.createToken(tokenPayload);
            return respond(true,201,{...createdUser,token},res);
        }
    }catch(err) {
        next(err);
    }
};


module.exports = {
    signup,
};