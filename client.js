// ==UserScript==
// @name         Script agarioplay.org
// @namespace    Michel_Betancourth@hotmail.com
// @version      2.5
// @description  Script para el clan ☣mᗬᎫ☣
// @author       Alein
// @match        http://agariohere.com/*
// @match        http://agario.mobi/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

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
    var names = ["ᒎᗩᑎᗪᑕツᔕᗩᒪᗩƵ","☣mᗬᎫ☣☆คlєเภ☆","☣mᗬᎫ☣☆ℓυηค☆","☣mᗬᎫ☣☆קּяΘ☆","凸(^_^)凸","ک!мþℓعмэи†э","ᖫ✧Ǥяυиgє✧ᖭ","☣mᗬᎫ☣☆ᒪᑌᑎᗩ☆","★کτγℓع★"];// Nombre del jugador
    window.jQuery("#nick").replaceWith("<select id=\"nick\" class=\"form-control\" onchange=\"\" required=\"\">");  
    for(var i = 0; i < names.length; i++){
        window.jQuery("#nick").append("<option value=\"" + names[i] + "\" >" + names[i] + "</option>");
    }
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

(function() {
    window.setShowMass(true);
    window.setSkipStats(true);
    AntiBlockChat();
    MouseHack(50);
    SelectorName();
})();