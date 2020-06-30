const express = require("express");
const routes = require("./utils/routes");
const {initDatabase} = require("./utils/db");
const RoutesSettings = require("./utils/RoutesSettings");
const mainErrorHandler = require("./utils/mainErrorHandler");
const app = express();
// init Settings: 
RoutesSettings(app);
// init Routes
app.use("/api", routes);
// Error Handeling: 
mainErrorHandler(app);
// Connect to Database
initDatabase();


module.exports = app;