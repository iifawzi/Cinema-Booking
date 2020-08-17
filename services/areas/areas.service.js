const  areasModel  = require("./areas.model");
const { Op } = require("sequelize");
exports.getArea = async ({country_id,area_ar, area_en})=>{
    const area = await areasModel.findOne({where:{  [Op.and]: [{country_id}, {[Op.or]: [{area_ar}, {area_en}]}] }});
    if (area){
        return area.dataValues;
    }else {
        return area;
    }
};
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
