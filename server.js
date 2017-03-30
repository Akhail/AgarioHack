var express = require('express'),
    app = express();
    server = require('http').Server(app),
    io = require('socket.io')(server);