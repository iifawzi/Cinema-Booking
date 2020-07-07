const {handleError,ErrorHandler} = require("../../helpers/error");
const {checkIfPhoneExists} = require("./users.service");
const signup = async (req,res,next)=>{
    try {
        const userExist = await checkIfPhoneExists(req.body.phone_number);
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