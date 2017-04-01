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