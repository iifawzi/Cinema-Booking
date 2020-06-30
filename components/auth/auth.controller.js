const test = require("./auth.model")
exports.signIn = (req,res,next)=>{
    try {
        test(5);
        res.json("Dkld")
    }catch {
        next(err);
    }
    
}