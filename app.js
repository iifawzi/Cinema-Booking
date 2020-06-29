const express = require("express");
const routes = require("./utils/routes");
const {initDatabase} = require("./utils/db");
const app = express();

// init Routes
routes("/api",app);
// Connect to Database
initDatabase();


module.exports = app;