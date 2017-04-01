function ShowAliasMap() {
    var canvas = $('<canvas>', { 'class': 'mapcanvas'}).prop({ width: '150', height: '150'}).get(0);
    var ctx = canvas.getContext("2d");
    var dead = false;

    $('#mini-map-wrapper').append(canvas); // Contenedor

    socket.on('connected', function(){
        console.log("Connectado");
    });

    setInterval(function() {
        var actualy = $('#pserver').val();
        var sendo = [];
        for (var partec in window.mini_map_tokens) {
            var obj = window.mini_map_tokens[partec];
            sendo.push(obj);
        }
        socket.emit("sendcoord", sendo, actualy);
    }, 100);

    
    socket.on('aliescoord', function(coords) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        coords.forEach(function(obj){
            var valx = obj.x * canvas.width;
            var valy = obj.y * canvas.height;
            var radio = obj.size * canvas.width;
            ctx.beginPath();
            ctx.arc(valx, valy, radio, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = obj.color;
            ctx.fill();
        });
    });

    $('#screenshot').hide();
    
    
}