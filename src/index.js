const express = require("express");
const app = express();

// Middlewares
const cors = require("cors");

app.use(cors());

// Routes
const routes = require('./routes');
app.use('/',routes);

module.exports = app;