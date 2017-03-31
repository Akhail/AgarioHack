var express = require('express'),
    app = express();
    server = require('http').createServer(app);
server.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "agariohere.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/client.js')
});
app.get('/style', function(req, res) {
    res.sendFile(__dirname + '/public/style.css');
});
app.get('/menu', function(req, res) {
    res.sendFile(__dirname + '/public/menu.html');
}) 

var objects;

io.on('connection', function(socket){
    socket.emit("connected");
    socket.on('joinroom', function(room) {
        socket.join(room);
    });
    socket.on('sendcoord', function(coords, room){
        socket.broadcast.to(room).emit('aliescoord', coords);
    });
});

console.log('Servidor corriendo');