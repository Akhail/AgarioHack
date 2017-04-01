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