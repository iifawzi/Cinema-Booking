const ticketsModel = require("./tickets.model");

exports.getTicket = async (slot_id,reservation_date,seat_position)=>{
    const ticket = await ticketsModel.findOne({where: {slot_id,reservation_date,seat_position}});
    if (ticket){
        return ticket.dataValues;
    }else {
        return ticket;
    }
};

exports.getTickets = async (attributes,slot_id, reservation_date)=>{
    const tickets = await ticketsModel.findAll({where: {slot_id, reservation_date}, attributes: [...attributes], raw: true});
    return tickets;
}

exports.addTicket = async (ticketData)=>{
    const addedTicket = await ticketsModel.create(ticketData);
    return addedTicket.dataValues;
};
