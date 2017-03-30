var express = require('express'),
    app = express();
    server = require('http').createServer(app);
server.listen(3000);
var io = require('socket.io').listen(server);

app.use(express.static('public'));
var objects;

io.on('connection', function(socket){
    socket.emit("connected");
    socket.on('sendcoord', function(coords){
        socket.broadcast.emit('aliescoord', coords);
    });
});

console.log('Servidor corriendo');