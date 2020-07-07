const {handleError} = require("../helpers/error");
module.exports = (app)=>{
    app.use((err,req,res,next)=>{
        handleError(err,res);
    });
};