const {handleError,ErrorHandler} = require("../../helpers/error");

const signup = (req,res)=>{
    try {
        throw new ErrorHandler(500,"hala wallah bitch");

    }catch(err) {
        handleError(err, res);
    }
};


module.exports = {
    signup,
};