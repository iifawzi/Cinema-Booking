const {handleError,ErrorHandler} = require("../../helpers/error");
const userService = require("./users.service");
const signup = async (req,res,next)=>{
    try {
        const {phone_number} = req.body;
        const userExist = await userService.checkIfPhoneExists(phone_number);
        if (userExist){
            throw new ErrorHandler(409, "Phone number already registered");
        }

    }catch(err) {
        next(err);
    }
};


module.exports = {
    signup,
};