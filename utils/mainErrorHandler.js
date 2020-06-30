module.exports = (app)=>{
    app.use((err,req,res,next)=>{
        console.log("i'm here!!");
    });
}
