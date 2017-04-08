function PrivateChat() {
    var logmsg = $('<div>', {
            'class': 'privateChat'
        }),
        input = $('<input>', { 
            'class': 'privateChat', 
            'type': 'text',
            'placeholder': 'Chat Privado',
            'maxlength': 34
        }),
        checkMsg = $('.hide_chatbox > label').first().children('input');
    $(window).on('keydown', function(evt){
        if(evt.key == 'c') {
            checkMsg.prop('checked', !checkMsg.is(':checked'));
            changeChat();
        }
    });
    function changeChat() {
        var chat = $('div.privateChat');
        if(checkMsg.is(':checked')){
            chat.show();
            window.setHideChat(true);
            input.show();
        } else {
            chat.hide();
            input.hide();
            window.setHideChat(false);
        }
    }
    checkMsg.click(changeChat);
    
    changeChat();

    socket.on('allieschat', function(user, text, color){
        if(text.length > 0){
            var chat = $('div.privateChat');
            var msgFrom = $('<span>', {
                'style': "color: " + color,
                'text': user + ": "
            });
            var msg = $('<span>', {
                'text': text
            });
            msg.prepend(msgFrom);
            if(chat.children().length >= 10) chat.find('span:first').remove();
            chat.append(msg);
            console.log(text);
        }
        
    });
    
    input.keydown(function(evt) {
        if(evt.which == 13) {
            var obj = window.mini_map_tokens.filter(function(x) { return x !== undefined; })[0];

            console.log("color");
            socket.emit('sendchat', $('#nick').val(), $(this).val(), obj.color);
            $(this).val('');
        }
            
    });
    var body = $('body');
    body.append(input);
    body.append(logmsg);
}