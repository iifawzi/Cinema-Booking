const cinemaAccountsServices  = require("./cinemaAccounts.service");
const respond = require("../../helpers/respond");
const {encryptPassword, decryptPassword} = require("../../helpers/bcrypt");
const {cinemaTokenPayLoad} = require("../../helpers/tokens");
const {createToken} = require("../../helpers/jwt");
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
        const cinemaUser = await cinemaAccountsServices.getAccountData(username);
        if (!cinemaUser){
            throw new ErrorHandler(401, "Username is not registered");
        }
        const passwordIsSame = await decryptPassword(password,cinemaUser.password);
        if (passwordIsSame){
            delete cinemaUser.password;
            const payLoad = cinemaTokenPayLoad(cinemaUser.username,cinemaUser.cinema_id,cinemaUser.cinemaAccount_id,cinemaUser.role);
            const token = createToken(payLoad);
            return respond(true,200,{...cinemaUser,token},res);
        }
    }catch(err){
        next(err);
    }
};



module.exports = {
    addAccount,
    signin
}