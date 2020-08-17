const countriesServices  = require("./countries.service");
const respond = require("../../helpers/respond");
const { ErrorHandler } = require("../../helpers/error");

const addCountry = async (req,res,next)=>{
    try {
        const countryData = req.body;
        const isExist = await countriesServices.getCountry(countryData);
        if (isExist) {
            throw new ErrorHandler(409,"This Country is already exists");
        }
        const addedCountry = await countriesServices.createCountry(countryData);
        if (addedCountry){
            return respond(true,201,addedCountry,res);
        }    
    }catch(err){
        next(err);
    }
}

module.exports = {
    addCountry,
}