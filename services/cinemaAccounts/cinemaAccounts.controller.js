const cinemaAccountsServices  = require("./cinemaAccounts.service");
const respond = require("../../helpers/respond");
const {encryptPassword, decryptPassword} = require("../../helpers/bcrypt");
const {cinemaTokenPayLoad} = require("../../helpers/tokens");
const {createToken,decodeToken} = require("../../helpers/jwt");
const crypto = require("crypto");
const { ErrorHandler } = require("../../helpers/error");


const addAccount = async (req,res,next)=>{
    try {
        const accountData = req.body;
        const cinemaAccount = await cinemaAccountsServices.isExists(accountData.username);
        if (cinemaAccount){
            throw new ErrorHandler(409, "username is already registered");
        }
        const encryptedPassword = await encryptPassword(accountData.password);
        accountData.password = encryptedPassword;
        const refresh_token = crypto.randomBytes(16).toString("hex");
        accountData.refresh_token = refresh_token;
        const account = await cinemaAccountsServices.addAccount(accountData);
        if (account){
            delete account.refresh_token,
            delete account.password
            return respond(true,201,account,res);
        }
    }catch(err){
        next(err);
    }
};


const signin = async (req,res,next)=>{
    try {
        const {username, password} = req.body;
        const cinemaUser = await cinemaAccountsServices.isExists(username);
        if (!cinemaUser){
            throw new ErrorHandler(401, "Username is not registered");
        }
        const passwordIsSame = await decryptPassword(password,cinemaUser.password);
        if (passwordIsSame){
            delete cinemaUser.password;
            const payLoad = cinemaTokenPayLoad(cinemaUser.username,cinemaUser.cinema_id,cinemaUser.cinemaAccount_id,cinemaUser.name_ar,cinemaUser.name_en,cinemaUser.role);
            const token = createToken(payLoad);
            return respond(true,200,{...cinemaUser,token},res);
        }
    }catch(err){
        next(err);
    }
};


// To refresh account's token (will be called once the the token is expired or 5 min to expire):

const refreshToken = async (req,res,next)=>{
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
            let accountData =  decodeToken(splicedToken);
            if (accountData && accountData.account_id){
                // check if account with the id given in the token matchs the refresh token.
                const account = await cinemaAccountsServices.checkRefreshToken(accountData.account_id,refresh_token);
                if (!account){
                    throw new ErrorHandler(401, "User is not Authenticated - No matching");
                }
                const payLoad = cinemaTokenPayLoad(account.username, account.cinema_id,account.cinemaAccount_id,account.name_ar,account.name_en,account.role);
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
    addAccount,
    signin,
    refreshToken
}