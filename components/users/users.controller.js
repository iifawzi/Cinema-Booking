const {handleError,ErrorHandler} = require("../../helpers/error");

const signup = (req,res,next)=>{
    try {
        console.log(req);
    }catch(err) {
        next(err);
    }
};


module.exports = {
    signup,
};