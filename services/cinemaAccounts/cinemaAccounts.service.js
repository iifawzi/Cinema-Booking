const  cinemaAccountsModel  = require("./cinemaAccounts.model");
const {db} = require("../../startup/db");
const Sequelize = require("sequelize");

// To check if username is already exists or not
exports.isExists = async (username)=>{
    const cinemaAccount = await cinemaAccountsModel.findOne({where:{username}, attributes: ['cinema_id']});
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