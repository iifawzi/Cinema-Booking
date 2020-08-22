const {ErrorHandler} = require("../../helpers/error");
const respond = require("../../helpers/respond");
const usersServices = require("./users.service");
const {createToken, decodeToken} = require("../../helpers/jwt");
const crypto = require("crypto");
const { userTokenPayLoad } = require("../../helpers/tokens");
// For adding new User: 
const signup = async (req,res,next)=>{
    try {
        const userData = req.body;
        const userExist = await usersServices.checkIfPhoneExists(userData.phone_number);
        if (userExist){
            throw new ErrorHandler(409, "Phone number is already registered");
        }
        const refresh_token = crypto.randomBytes(16).toString("hex");
        userData.refresh_token = refresh_token;
        const createdUser = await usersServices.createNewUser(userData);
        if (createdUser){
            const getUserData = await usersServices.getUserData(userData.phone_number);
            const payLoad = userTokenPayLoad(getUserData.phone_number, getUserData.user_id,"user")
            const token = createToken(payLoad);
            return respond(true,201,{...getUserData,token},res);
        }
    }catch(err) {
        next(err);
    }
};
// To Login a user: 
const signin = async (req,res,next)=>{
    try {
        const userData = req.body;
        const userExist = await usersServices.getUserData(userData.phone_number);
        if (!userExist) {
            throw new ErrorHandler(401,"Phone number is incorrect");
        }
        if (userExist.blocked === true) {
            throw new ErrorHandler(403,"User with this Phone number is blocked");
        }
        const payLoad = userTokenPayLoad(userExist.phone_number, userExist.user_id,"user")
        const token = createToken(payLoad);
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
            throw new ErrorHandler(401, "User is not Authenticated - token not provided");
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
            if (user_data && user_data.user_id && user_data.phone_number){
                // check if user with the id given in the token matchs the refresh token, will return the phone_number, user_id
                const user = await usersServices.checkRefreshToken(user_data.user_id,refresh_token);
                if (!user){
                    throw new ErrorHandler(401, "User is not Authenticated - No matching");
                }
                const payLoad = userTokenPayLoad(user.phone_number, user.user_id,"user")
                const newToken = createToken(payLoad);
                return respond(true,200,{token: newToken},res);
            }else {
                throw new ErrorHandler(401, "User is not Authenticated - invalid token");
            }
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