const  cinemaAccountsModel  = require("./cinemaAccounts.model");
const {db} = require("../../startup/db");
const Sequelize = require("sequelize");

// To check if username is already exists or not
exports.isExists = async (username)=>{
    const cinemaAccount = await cinemaAccountsModel.findOne({where:{username}, attributes: ['cinema_id','cinemaAccount_id','name_ar','name_en','phone_number','role','refresh_token','password']});
    if (cinemaAccount){
        return cinemaAccount.dataValues;
    }else {
        return cinemaAccount;
    }
};
// To add new account
exports.addAccount = async (cinemaData)=>{
    const account =  await cinemaAccountsModel.create(cinemaData);
    return account.dataValues;
};

// This service to check if refresh token belongs to account_id (getting account's data by user_id and refresh_token): 
exports.checkRefreshToken = async (cinemaAccount_id, refresh_token)=>{
    const accountData =  await cinemaAccountsModel.findOne({where: {refresh_token,cinemaAccount_id}, attributes: ["cinemaAccount_id", "cinema_id",'username','name_ar','name_en','role']});
    if (accountData){
        return accountData.dataValues;
    }else {
        return accountData;
    }
};