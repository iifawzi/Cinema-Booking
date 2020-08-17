const  countriesModel  = require("./countries.model");
const { Op } = require("sequelize");
exports.getCountry = async ({country_ar, country_en})=>{
    const country = await countriesModel.findOne({where:{  [Op.or]: [ { country_ar },{ country_en }]}});
    if (country){
        return country.dataValues;
    }else {
        return country;
    }
};
// To Add a Country: 
exports.createCountry = async (countryData)=>{
    const country = await countriesModel.create(countryData);
    return country.dataValues;
}

// to delete a country, mostly used in tests
exports.deleteCountry = async (country_id)=>{
    const country = await countriesModel.destroy({where: {country_id}});
    return country;
}
