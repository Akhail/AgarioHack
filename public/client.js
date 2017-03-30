// ==UserScript==
// @name         Script agarioplay.org
// @namespace    Michel_Betancourth@hotmail.com
// @version      3.0
// @description  Script para el juego agariohere
// @author       Akhail (Michel Betancourt)
// @match        http://agariohere.com/*
// @match        http://agario.mobi/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';
(function() {
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
        var $ = window.jQuery;
        var nick = $("#nick");

        var names = JSON.parse(localStorage.getItem('names_agario'));
        var last = localStorage.getItem("last_agario_name");
        var option;

        if(names === null) {
            names = [];
            names.push([prompt("Nuevo nombre: ")]);
            localStorage.setItem('names_agario', JSON.stringify(names));
        }

        var select = $('<select>', {
            'id': 'nick',
            'class': 'form-control',
            'change': function() {
                if($(this).val() == 'nuevo'){
                    var news = prompt("Nuevo nombre: ");
                    $(this).prepend($('<option>', {
                        'value': news,
                        'text': news 
                    }));

                    names.push(news);
                    localStorage.setItem('names_agario', JSON.stringify(names));
                    $(this).val(news);
                }
                localStorage.setItem("last_agario_name", $(this).val());
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
        var $ = window.jQuery;
        var socket = io.connect('http://localhost:3000');
        var canvas = document.createElement("canvas");
        var sendo;

        canvas.style.top = "0"; canvas.style.bottom = "0";
        canvas.style.right = "0"; canvas.style.left = "0";
        canvas.style.position = "absolute"; canvas.style.zIndex = "1000";
        canvas.width = 150;
        canvas.height = 150;

        $('#mini-map-wrapper').append(canvas);

        socket.on('connected', function(){
            console.log("Connectado");
        });
        
        var name = $("#nick").val();

        setInterval(function() {
            sendo = [];
            for (var partec in window.mini_map_tokens) {
                var obj = window.mini_map_tokens[partec];
                obj.nick = name;
                console.log(obj);
                sendo.push(obj);
            }
            socket.emit("sendcoord", sendo);
        }, 1000 / 20);

        socket.on('aliescoord', function(alie) {
            var mini_map = canvas;
            var ctx = mini_map.getContext("2d");
            ctx.clearRect(0, 0, mini_map.width, mini_map.height);
            for (var partec in alie) {
                var obj = alie[partec];
                var valx = obj.x * mini_map.width;
                var valy = obj.y * mini_map.height;
                var radio = obj.size * mini_map.width;
                ctx.beginPath();
                ctx.arc(valx, valy, radio, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fillStyle = obj.color;
                ctx.fill();
            }
        });

        $('#screenshot').hide();
    }


    window.setShowMass(true);
    window.setSkipStats(true);
    AntiBlockChat();
    MouseHack(50);
    SelectorName();
    ShowAliasMap();
})();