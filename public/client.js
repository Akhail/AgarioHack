// @name         Script agarioplay.org
// @version      3.22
// @description  Script para el juego agariohere
// @author       Akhail (Michel Betancourt)

'use strict';
(function() {
    var socket = io.connect(window.pserver);

    function MouseHack(retardo) {
        var interval;

        window.addEventListener("mousedown", function(evt) {
            if (evt.which == 3) {
                interval = setInterval(function() {
                    window.onkeydown({
                        keyCode: 87
                    }); // KEY_W
                    window.onkeyup({
                        keyCode: 87
                    });
                }, retardo);
            }
        });

        window.addEventListener("mouseup", function(evt) {
            if (evt.which == 3) {
                clearInterval(interval);
            }
        });
    }

    function SelectorName() {
        var nick = $("#nick");

        var names = JSON.parse(localStorage.getItem('names_agario'));
        var last = localStorage.getItem("last_agario_name");
        var option;

        if(names === null) {
            names = [];
            var ent = prompt("Nuevo nombre: ");
            if(ent !== null) {
                names.push(ent);
            }
            localStorage.setItem('names_agario', JSON.stringify(names));
        }

        var select = $('<select>', {
            'id': 'nick',
            'class': 'form-control',
            'change': function() {
                if($(this).val() == 'nuevo'){
                    var news = prompt("Nuevo nombre: ");
                    if(news !== null){
                        $(this).prepend($('<option>', {
                            'value': news,
                            'text': news 
                        }));

                        names.push(news);
                        localStorage.setItem('names_agario', JSON.stringify(names));
                        $(this).val(news);
                    }
                    
                } else {
                    localStorage.setItem("last_agario_name", $(this).val());
                }
            }
        });

        names.forEach(function(element) {
            option = $('<option>', {
                'value': element,
                'text': element
            });
            select.append(option);
        });

        option = $('<option>', {
            'text': 'Agregar Nuevo',
            'value': 'nuevo'
        });

        select.append(option);
        if(last !== null) select.val(last);
        nick.replaceWith(select);
    }

    function AntiBlockChat() {
        window.alert = function ( text ) { return true; };
        window.addEventListener('keydown', function(evt) {
            if (evt.keyCode == 13) {
                if(document.getElementById("chat_textbox").disabled === true){
                    document.getElementById("chat_textbox").disabled = false;
                }
            }
        });
    }

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

    function MenuScript() {
        var mainpanel = $('#mainPanel');

        mainpanel.css({'position': 'relative'});
        var main = $('<div>', {'class': 'optionScript'});
        main.append($('<h2>Menu Script</h2><div><h3>Codigo Amigo</h3><input type="text" id="pserver"></div><h4>Script Desarrollado por: Michel Betancourt(Akhail)</h4>'));        
        mainpanel.append(main);
    }

    window.setShowMass(true);
    window.setSkipStats(true);
    AntiBlockChat();
    MouseHack(50);
    SelectorName();

    MenuScript();
    ShowAliasMap();
})();