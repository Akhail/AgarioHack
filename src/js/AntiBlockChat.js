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