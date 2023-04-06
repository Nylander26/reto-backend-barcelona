// Initialization

const express = require("express");
const app = express();
const path = require("path");
require('./database');

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: false }));

// Global Variables

// Routes

module.exports = app;
