const cinemasServices  = require("./cinemas.service");
const respond = require("../../helpers/respond");
const {encryptPassword} = require("../../helpers/bcrypt");
const add_cinema = async (req,res,next)=>{
    try {
        const cinemaData = req.body;
        const encryptedPassword = await encryptPassword(cinemaData.password);
        cinemaData.password = encryptedPassword;
        const cinema = await cinemasServices.addCinema(cinemaData);
        if (cinema){
            delete cinema.createdAt;
            delete cinema.updatedAt;
            delete createdUser.latitude; // not used untill now.
            delete createdUser.longitude; // not used untill now.
            return respond(true,201,cinema,res);
        }
    }catch(err){
        next(err);
    }
};


module.exports = {
    add_cinema
};