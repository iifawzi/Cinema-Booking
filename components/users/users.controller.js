const {handleError,ErrorHandler} = require("../../helpers/error");

const signup = (req,res,next)=>{
   try {
    throw new ErrorHandler(500,"hala wallah bitch");

   }catch(err) {
    handleError(err, res);
   }
};


module.exports = {
    signup,
}