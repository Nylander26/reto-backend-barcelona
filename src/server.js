// Initialization
const express = require("express");
const app = express();
const path = require("path");
const morgan = require('morgan');
require('./database');

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Global Variables

// Routes
app.use(require('./routes/index.routes'));

module.exports = app;
