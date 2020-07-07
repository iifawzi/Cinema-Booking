const usersModel = require("./users.model");


const checkIfPhoneExists = async (phone_number)=>{
    const userWithThisPhone =  await usersModel.findOne({phone_number});
    console.log(userWithThisPhone);
};