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

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// Routes
const routes = require('./routes');

app.use('/', routes(io));

module.exports = {
    app,
    server
};