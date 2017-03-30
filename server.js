var express = require('express'),
    app = express();
    server = require('http').createServer(app);
server.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/client.js')
})
var objects;

io.on('connection', function(socket){
    socket.emit("connected");
    socket.on('sendcoord', function(coords){
        socket.broadcast.emit('aliescoord', coords);
    });
});

console.log('Servidor corriendo');