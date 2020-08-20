const ticketsServices  = require("./tickets.service");
const respond = require("../../helpers/respond");
const { ErrorHandler } = require("../../helpers/error");

const addTicket = async (req,res,next)=>{
    try {
        const ticketData = req.body;
        const isExist = await ticketsServices.getTicket(ticketData)
        if (isExist){
            throw new ErrorHandler(409,"This seat is already booked");
        }
        ticketData.user_id = req.requester.user_id;
        const addedTicket = await ticketsServices.addTicket(ticketData);
        if (addedTicket){
            return respond(true,201,addedTicket,res);
        }
    }catch(err){
        next(err);
    }
};

module.exports = {
    addTicket,
}