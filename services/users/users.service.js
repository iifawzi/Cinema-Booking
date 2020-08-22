const usersModel = require("./users.model");
const {db} = require("../../startup/db");
const Sequelize = require("sequelize");
// This service is used to check if phone is already exists:
exports.checkIfPhoneExists = async (phone_number)=>{
    const userWithThisPhone =  await usersModel.findOne({where: {phone_number}, attributes: ["user_id"]});
    if (userWithThisPhone){
        return userWithThisPhone.dataValues;
    }else {
        return userWithThisPhone;
    }
};

exports.getUserData = async (phone_number)=>{
    const userData = await db.query("SELECT users.user_id, users.phone_number,users.first_name,users.last_name,users.wallet,users.firebase_token,users.refresh_token, areas.area_ar,areas.area_en,countries.country_ar,countries.country_en from users INNER JOIN areas ON areas.area_id = users.area_id INNER JOIN countries ON countries.country_id = areas.country_id WHERE users.phone_number = ?", {
        replacements: [phone_number],
        type: Sequelize.QueryTypes.SELECT,
    });
    return userData[0];
}

// This service is used to create a new user:
exports.createNewUser = async (data)=>{
    const createdUser = await usersModel.create(data);
    return createdUser.dataValues;
};

// This service is used to delete an account, mostly used in tests: 
exports.deleteUser = async (phone_number)=>{
    const deletedUser = await usersModel.destroy({where: {phone_number}});
    return deletedUser;
};

// This service to check if refresh token belongs to user_id (getting user's data by user_id and refresh_token): 
exports.checkRefreshToken = async (user_id, refresh_token)=>{
    const userData =  await usersModel.findOne({where: {refresh_token,user_id}, attributes: ["user_id", "phone_number"]});
    return userData;
};