const cinemasServices  = require("./cinemas.service");
const respond = require("../../helpers/respond");
const {encryptPassword, decryptPassword} = require("../../helpers/bcrypt");
const {cinemaTokenPayLoad} = require("../../helpers/tokens");
const {createToken} = require("../../helpers/jwt");
const { ErrorHandler, handleError } = require("../../helpers/error");
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
            const getCinemaData = await cinemasServices.getCinemaData(cinemaData.username);
            delete getCinemaData.createdAt;
            delete getCinemaData.updatedAt;
            delete getCinemaData.refresh_token;
            delete getCinemaData.area_id;
            delete getCinemaData.password;
            delete getCinemaData.latitude; // not used untill now.
            delete getCinemaData.longitude; // not used untill now.
            return respond(true,201,getCinemaData,res);
        }
    }catch(err){
        next(err);
    }
};

const signin = async (req,res,next)=>{
    try {
        const {username, password} = req.body;
        const cinemaUser = await cinemasServices.getCinemaData(username);
        if (!cinemaUser){
            throw new ErrorHandler(401, "Username is not registered");
        }
        const passwordIsSame = await decryptPassword(password,cinemaUser.password);
        if (passwordIsSame){
            delete cinemaUser.updatedAt;
            delete cinemaUser.createdAt;
            delete cinemaUser.password; 
            delete cinemaUser.area_id;
            delete cinemaUser.latitude; // not used untill now.
            delete cinemaUser.longitude; // not used untill now.
            const payLoad = cinemaTokenPayLoad(cinemaUser.username,cinemaUser.cinema_id,"cinema");
            const token = createToken(payLoad);
            return respond(true,200,{...cinemaUser,token},res);
        }
    }catch(err){
        next(err);
    }
};


const getCinemas = async (req,res,next)=>{
    try {
        const {city,country,movie_id} = req.body;
        const cinemas = await cinemasServices.getCinemasForMovie(country,city,movie_id);
        if (cinemas){
            return respond(true,200,cinemas,res);
        }
    }catch(err){
        next(err);
    }
}

const toggleCinemaStatus = async (req,res,next)=>{
    try {
        const {cinema_id} = req.body;
        const toggleCinema = await cinemasServices.toggleStatus(cinema_id);
        if(toggleCinema){
            return respond(true,200,toggleCinema,res);
        }else {
            throw new ErrorHandler(404, "Cinema is not found");
        }
    }catch(err){
        next(err);
    }
}

module.exports = {
    add_cinema,
    signin,
    getCinemas, 
    toggleCinemaStatus
};