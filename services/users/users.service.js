const usersModel = require("./users.model");

exports.checkIfPhoneExists = async (phone_number)=>{
    const userWithThisPhone =  await usersModel.findOne({phone_number});
    return userWithThisPhone;
};