const  areasModel  = require("./areas.model");
const { Op } = require("sequelize");
const {db} = require("../../startup/db");
const Sequelize = require("sequelize");
exports.getArea = async ({country_id,area_ar, area_en})=>{
    const area = await areasModel.findOne({where:{  [Op.and]: [{country_id}, {[Op.or]: [{area_ar}, {area_en}]}] }, attributes: ['area_id']});
    if (area){
        return area.dataValues;
    }else {
        return area;
    }
};

exports.getAreas = async()=>{
    const areas = db.query("SELECT areas.area_id,areas.area_ar,areas.area_en FROM areas INNER JOIN cinemas ON areas.area_id = cinemas.area_id INNER JOIN halls ON halls.cinema_id = cinemas.cinema_id INNER JOIN slots ON slots.hall_id = halls.hall_id WHERE cinemas.cinema_status = true AND halls.hall_status = true AND slots.slot_status = true GROUP BY areas.area_id", {
        type: Sequelize.QueryTypes.SELECT,
    });
    return areas;
}

// To Add an Area: 
exports.createArea = async (areaData)=>{
    const area = await areasModel.create(areaData);
    return area.dataValues;
}

// to delete an Area, mostly used in tests
exports.deleteArea = async (area_id)=>{
    const area = await areasModel.destroy({where: {area_id}});
    return area;
}
