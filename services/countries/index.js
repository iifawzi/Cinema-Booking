const countriesModel = require("./countries.model");
const countriesRouter = require("./countries.route");
const {deleteCountry} = require("./countries.service");
module.exports = {
    countriesModel,
    countriesRouter, 
    deleteCountry
}