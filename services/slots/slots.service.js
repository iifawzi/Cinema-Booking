
const slotsModel = require("./slots.model");
const { Op } = require("sequelize");
// Check if the hall is busy in that date and start time
exports.checkIfBusy = async (hall_id, start_date,start_time, end_time)=>{
    console.log(start_time);
    const hall = await slotsModel.findOne({where:{
        [Op.and]:[
            {start_date: {
            [Op.lte]: start_date,
        }},
            {end_date: {
            [Op.gte]: start_date,
        }},
        {hall_id: {
            [Op.eq]: hall_id,
        }},


        {[Op.or]: [
            {[Op.and]: [
                {start_time: {
                    [Op.gte]: start_time,
                }},
                {start_Time: {
                    [Op.lte]: end_time,
                 }},
                ]},
            {[Op.and]: [
                {end_time: {
                    [Op.gte]: start_time,
                }},
                {end_time: {
                    [Op.lte]: end_time,
                 }},
                ]},
                {[Op.and]: [
                    {start_time: {
                        [Op.lte]: start_time,
                    }},
                    {end_time: {
                        [Op.gte]: end_time,
                     }},
                    ]}
            ]},
    ]
    }});
    if (hall){
        return hall.dataValues;
    }else {
    return hall;
    }
};

exports.createSlot = async (slotData)=>{
    const slot = await slotsModel.create(slotData);
    return slot.dataValues;
}