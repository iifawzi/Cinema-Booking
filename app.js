const express = require("express");
const routes = require("./startup/routes");
const {initDatabase} = require("./startup/db");
const models = require("./startup/models");
const RoutesSettings = require("./startup/RoutesSettings");
const mainErrorHandler = require("./startup/mainErrorHandler");
const addSystemUser = require("./startup/systemUser");
const app = express();
// init Settings: 
RoutesSettings(app);
// init Routes
app.use("/api", routes);
// Error Handeling: 
mainErrorHandler(app);
// Connect to Database
initDatabase();
// add System's user
addSystemUser();

module.exports = app;