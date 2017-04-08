// @name         Script agarioplay.org
// @description  Script para el juego agario
// @author       Akhail (Michel Betancourt)

var socket = io.connect(window.pserver);

window.setShowMass(true);
window.setSkipStats(true);
AntiBlockChat();
MouseHack(50);
SelectorName();

ShowAliasMap();
PrivateChat();
MenuScript();