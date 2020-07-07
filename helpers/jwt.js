const jwt = require("jsonwebtoken");
const config = require("config");
const {ErrorHandler, handleError} = require("../helpers/error");


exports.createToken = (payload)=>{
    const token = jwt.sign(payload,config.get("jwt.secret"),{expiresIn: config.get("jwt.expiresIn")});
    return token;
};


exports.checkToken = (token)=>{
    try {
        const checkingResult = jwt.verify(token,config.get("jwt.secret"));
        return checkingResult;
    }catch(err){
        throw new ErrorHandler(401,"Token isn't valid");
    }

};