function MenuScript() {
    var mainpanel = $('#mainPanel');

    mainpanel.css({'position': 'relative'});
    var main = $('<div>', {'class': 'optionScript'});
    main.append($('<h2>Menu Script</h2><div><h3>Codigo Amigo</h3><input type="text" id="pserver"></div><h4>Script Desarrollado por: Michel Betancourt(Akhail)</h4>'));        
    mainpanel.append(main);
}