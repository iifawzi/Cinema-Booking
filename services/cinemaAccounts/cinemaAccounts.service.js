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
// to get account's cinema's data
exports.getAccountData = async (username)=>{
    const accountData = await db.query("SELECT cinemaAccounts.cinemaAccount_id,cinemaAccounts.username,cinemaAccounts.password,cinemaAccounts.role,cinemaAccounts.refresh_token,cinemas.cinema_id,cinemas.cinema_ar,cinema_en,cinemas.cinema_logo,cinemas.cinema_description,cinemas.contact_number,cinemas.cinema_status,cinemas.last_checkout, areas.area_ar,areas.area_en,countries.country_ar,countries.country_en from cinemaAccounts INNER JOIN cinemas ON cinemas.cinema_id = cinemaAccounts.cinema_id INNER JOIN areas ON areas.area_id = cinemas.area_id INNER JOIN countries ON countries.country_id = areas.country_id WHERE cinemaAccounts.username = ?", {
        replacements: [username],
        type: Sequelize.QueryTypes.SELECT,
    });
    return accountData[0];
}


// This service to check if refresh token belongs to account_id (getting account's data by user_id and refresh_token): 
exports.checkRefreshToken = async (cinemaAccount_id, refresh_token)=>{
    const accountData =  await cinemaAccountsModel.findOne({where: {refresh_token,cinemaAccount_id}, attributes: ["cinemaAccount_id", "cinema_id",'username','role']});
    return accountData;
};