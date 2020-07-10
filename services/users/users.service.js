const usersModel = require("./users.model");

// This service is used to check if phone is already exists:
exports.checkIfPhoneExists = async (phone_number)=>{
    const userWithThisPhone =  await usersModel.findOne({where: {phone_number}});
    if (userWithThisPhone){
        return userWithThisPhone.dataValues;
    }else {
        return userWithThisPhone;
    }
};

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
    const userData =  await usersModel.findOne({where: {user_id, refresh_token}, attributes: ["user_id", "phone_number"]});
    if (userData){
        return userData.dataValues;
    }else {
        return userData;
    }
};