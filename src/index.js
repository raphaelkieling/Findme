const bodyParser = require('body-parser');
const socketIO = require('socket.io');

// Server
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = socketIO.listen(server, { wsEngine: 'ws' });

// Middlewares
const cors = require("cors");

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb' }));

app.use(cors());

// Routes
const routes = require('./routes');

app.use('/', routes(io));

module.exports = {
    app,
    server
};