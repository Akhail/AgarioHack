// ==UserScript==
// @name         Script agarioplay.org
// @namespace    Michel_Betancourth@hotmail.com
// @version      3.25
// @description  Script para el juego agariohere
// @downloadURL  http://agariohack.herokuapp.com/
// @author       Akhail (Michel Betancourt)
// @match        http://agarioplayy.org/
// @match        http://agariohere.com/
// @grant        none
// ==/UserScript==
/* jshint -W097 */
function inject(vectInj) {
    var ant = null;
    vectInj.forEach(function(elements) {
        var urle = elements[0];
        var type = elements[1];
        var element = document.createElement(type);
        if(type == 'script'){
            element.setAttribute("src", urle);
            element.setAttribute("type", "application/javascript");
        }
        else {
            element.setAttribute("rel", "stylesheet");
            element.setAttribute("href", urle);
        }
        var load = function() {
            document.body.appendChild(element);
        };
        if (ant === null){
            ant = element;
            load();
        } else {
            ant.onload = setTimeout(load, 1000);
        }
        if(vectInj.length == 1) document.body.appendChild(element);
    });
}
window.pserver = 'http://agariohack.herokuapp.com/';

inject([
    ['https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js', 'script'],
    ["https://fonts.googleapis.com/css?family=Roboto", 'link'],
    [window.pserver + "style", 'link'],
    [window.pserver + "client", 'script']
]);
