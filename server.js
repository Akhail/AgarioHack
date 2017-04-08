var express = require('express'),
    app = express();
    server = require('http').createServer(app);
server.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.get('/client', function(req, res){
    res.sendFile(__dirname + '/dist/client.min.js');
});
app.get('/', function(req, res){
    res.sendFile(__dirname + '/dist/script.js');
});
app.get('/style', function(req, res) {
    res.sendFile(__dirname + '/dist/style.min.css');
});

io.on('connection', function(socket){
    socket.emit("connected");
    socket.on('sendcoord', function(coords, room){
        if(room !== '') {
            if(room !== socket.room) {
                socket.leave(socket.room);
                socket.room = room;
                socket.join(room);
            }
            socket.broadcast.to(socket.room).emit('aliescoord', coords);
        }
    });
    socket.on('sendchat', function(user, text, color){
        if(room !== '') io.to(socket.room).emit('allieschat', user, text, color);
    });
});

console.log('Servidor corriendo');