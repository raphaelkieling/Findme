const express = require("express");
const app = express();
const bodyParser = require('body-parser');

// Middlewares
const cors = require("cors");
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

app.use(cors());

// Routes
const routes = require('./routes');
app.use('/',routes);

module.exports = app;