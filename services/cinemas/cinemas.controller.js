const cinemasServices  = require("./cinemas.service");
const respond = require("../../helpers/respond");
const {encryptPassword, decryptPassword} = require("../../helpers/bcrypt");
const {createToken} = require("../../helpers/jwt");
const { ErrorHandler } = require("../../helpers/error");
const crypto = require("crypto");

const add_cinema = async (req,res,next)=>{
    try {
        const cinemaData = req.body;
        const cinemaUser = await cinemasServices.isCinemaUserExists(cinemaData.username);
        if (cinemaUser){
            throw new ErrorHandler(409, "username is already registered");
        }
        const encryptedPassword = await encryptPassword(cinemaData.password);
        cinemaData.password = encryptedPassword;
        const refresh_token = crypto.randomBytes(16).toString("hex");
        cinemaData.refresh_token = refresh_token;
        const cinema = await cinemasServices.addCinema(cinemaData);
        if (cinema){
            delete cinema.createdAt;
            delete cinema.updatedAt;
            delete cinema.refresh_token;
            delete cinema.password;
            delete cinema.latitude; // not used untill now.
            delete cinema.longitude; // not used untill now.
            return respond(true,201,cinema,res);
        }
    }catch(err){
        next(err);
    }
};

const signin = async (req,res,next)=>{
    try {
        const {username, password} = req.body;
        const cinemaUser = await cinemasServices.isCinemaUserExists(username);
        if (!cinemaUser){
            throw new ErrorHandler(401, "Username is not registered");
        }
        const passwordIsSame = await decryptPassword(password,cinemaUser.password);
        if (passwordIsSame){
            const tokenPayload = {
                username: cinemaUser.username,
                cinema_id: cinemaUser.user_id,
                role:"cinema"
            };
            delete cinemaUser.updatedAt;
            delete cinemaUser.createdAt;
            delete cinemaUser.password; 
            delete cinemaUser.latitude; // not used untill now.
            delete cinemaUser.longitude; // not used untill now.
            const token = createToken(tokenPayload);
            return respond(true,200,{...cinemaUser,token},res);
        }
    }catch(err){
        next(err);
    }
};


module.exports = {
    add_cinema,
    signin
};