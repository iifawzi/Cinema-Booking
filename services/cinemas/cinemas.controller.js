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
        const cinema = await cinemasServices.addCinema(cinemaData);
        if (cinema){
            const getCinemaData = await cinemasServices.getCinemaData(cinema.cinema_id);
            return respond(true,201,getCinemaData,res);
        }
    }catch(err){
        next(err);
    }
};

const getCinemasForMovie = async (req,res,next)=>{
    try {
        const {area_id,movie_id, date} = req.body;
        const cinemas = await cinemasServices.getCinemasForMovie(area_id,movie_id, date);
        if (cinemas){
            const sortedCinemas = {};
            cinemas.forEach(cinema => {
                if (sortedCinemas[cinema.cinema_id] === undefined){
                    sortedCinemas[cinema.cinema_id] = {
                        ...cinema,
                        slots: [{
                            start_time: cinema.start_time,
                            end_time: cinema.end_time,
                            ticket_price: cinema.ticket_price,
                            hall_name: cinema.hall_name,
                            hall_description: cinema.hall_description,
                            hall_id: cinema.hall_id,
                            slot_id: cinema.slot_id
                        }
                        ]
                    }
                    delete sortedCinemas[cinema.cinema_id].start_time;
                    delete sortedCinemas[cinema.cinema_id].end_time;
                    delete sortedCinemas[cinema.cinema_id].hall_name;
                    delete sortedCinemas[cinema.cinema_id].hall_description;
                    delete sortedCinemas[cinema.cinema_id].hall_id;
                    delete sortedCinemas[cinema.cinema_id].slot_id;
                    delete sortedCinemas[cinema.cinema_id].ticket_price;
                }else {
                    sortedCinemas[cinema.cinema_id].slots.push({
                        start_time: cinema.start_time,
                        end_time: cinema.end_time,
                        ticket_price: cinema.ticket_price,
                        hall_name: cinema.hall_name,
                        hall_description: cinema.hall_description,
                        hall_id: cinema.hall_id,
                        slot_id: cinema.slot_id
                    })
                }
          });

            return respond(true,200,Object.values(sortedCinemas),res);
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
    getCinemasForMovie, 
    toggleCinemaStatus
};