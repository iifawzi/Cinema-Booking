const usersModel = require("./users.model");
// This service is used to check if phone is already exists:
exports.checkIfPhoneExists = async (phone_number)=>{
    const userWithThisPhone =  await usersModel.findOne({where: {phone_number}});
    return userWithThisPhone;
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