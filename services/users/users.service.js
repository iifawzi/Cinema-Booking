const usersModel = require("./users.model");

exports.checkIfPhoneExists = async (phone_number)=>{
    const userWithThisPhone =  await usersModel.findOne({where: {phone_number}});
    return userWithThisPhone;
};
exports.createNewUser = async (data)=>{
    const createdUser = await usersModel.create(data);
    return createdUser.dataValues;
};