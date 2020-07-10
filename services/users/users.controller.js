const {ErrorHandler} = require("../../helpers/error");
const respond = require("../../helpers/respond");
const userService = require("./users.service");
const {createToken, decodeToken} = require("../../helpers/jwt");
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
            delete createdUser.updatedAt;
            delete createdUser.createdAt;
            delete createdUser.blocked; 
            delete createdUser.latitude; // not used untill now.
            delete createdUser.longitude; // not used untill now.
            const token = createToken(tokenPayload);
            return respond(true,201,{...createdUser,token},res);
        }
    }catch(err) {
        next(err);
    }
};
// To Login new user: 
const signin = async (req,res,next)=>{
    try {
        const userData = req.body;
        const userExist = await userService.checkIfPhoneExists(userData.phone_number);
        if (!userExist) {
            throw new ErrorHandler(401,"Phone number is incorrect");
        }
        if (userExist.blocked === true) {
            throw new ErrorHandler(403,"User with this Phone number is blocked");
        }
        const tokenPayload = {
            phone_number: userExist.phone_number,
            user_id: userExist.user_id,
        };
        delete userExist.updatedAt;
        delete userExist.createdAt;
        delete userExist.blocked; 
        delete userExist.latitude; // not used untill now.
        delete userExist.longitude; // not used untill now.
        const token = createToken(tokenPayload);
        return respond(true,200,{...userExist,token},res);
    }catch(err){
        next(err);
    }
};
// To refresh user's token (will be called once the application opened if user is logined): 
const refresh_userToken = async (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        const {refresh_token} = req.body;
        if (!token) {
            throw new ErrorHandler(401, "User is not Authenticated");
        } else {
            let splicedToken;
            if (token.startsWith("Bearer ")) {
                // Remove Bearer from string
                const spliced = token.split(" ");
                splicedToken = spliced[1];
            }else {
                splicedToken = token;
            }
            let user_data =  decodeToken(splicedToken);
            // check if user with the id given in the token matchs the refresh token, will return the phone_number, user_id
            const user = await userService.checkRefreshToken(user_data.user_id,refresh_token);
            if (!user){
                throw new ErrorHandler(401, "User is not Authenticated");
            }
            const tokenPayload = {
                phone_number: user.phone_number,
                user_id: user.user_id,
            };
            const newToken = createToken(tokenPayload);
            return respond(true,200,{token: newToken},res);
        }
    }catch(err){
        next(err);
    }
};

module.exports = {
    signup,
    signin, 
    refresh_userToken
};