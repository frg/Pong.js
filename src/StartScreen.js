var keycode = require('keycode'),
    MessageScreen = require('./MessageScreen'),
    StartScreen,

    StartScreen = function() {
        this.message = 'PRESS ENTER';
        MessageScreen.apply(this, arguments);
    };

StartScreen.prototype = Object.create(MessageScreen.prototype);

StartScreen.prototype.bind = function() {
    var self = this;

    this.msgScreen = MessageScreen.prototype.bind.apply(this, arguments);

    this.game.on('start', function() {
        self.hide();
    });

    this.game.on('reset', function() {
        self.show();
    });

    document.addEventListener('keydown', function(e) {
        var key = keycode(e.keyCode);

        if (key === 'enter') {
            handleUserInput();
        }
    });

    this.msgScreen.msgText.interactive = true;
    this.msgScreen.msgText.touchend = this.msgScreen.msgText.click = handleUserInput;

    function handleUserInput() {
        if (!self.game.loop.playing) {
            self.game.start();
        }
    }
};

module.exports = StartScreen;