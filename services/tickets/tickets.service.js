const ticketsModel = require("./tickets.model");

exports.getTicket = async (ticketData)=>{
    const ticket = await ticketsModel.findOne({where: ticketData});
    if (ticket){
        return ticket.dataValues;
    }else {
        return ticket;
    }
};

exports.addTicket = async (ticketData)=>{
    const addedTicket = await ticketsModel.create(ticketData);
    return addedTicket.dataValues;
};
