
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
            {[Op.and]: [ // get any slot that will start at  [ entered start_time =< start_time < entered end_time  ] 
                {start_time: {
                    [Op.gte]: start_time,
                }},
                {start_Time: {
                    [Op.lt]: end_time,
                 }},
                ]},
            {[Op.and]: [ // get any slot that will end at  [ entered start_time < end_time <= entered end_time ] 
                {end_time: {
                    [Op.gt]: start_time,
                }},
                {end_time: {
                    [Op.lte]: end_time,
                 }},
                ]},
                {[Op.and]: [ // get any slot that will start [befroe entered start_time]  and will end [after entered end_time]
                    {start_time: {
                        [Op.lt]: start_time,
                    }},
                    {end_time: {
                        [Op.gt]: end_time,
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