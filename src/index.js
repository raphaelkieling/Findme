const express = require("express");
const app = express();

// Middlewares
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
const routes = require('./routes');
app.use('/',routes);

module.exports = app;