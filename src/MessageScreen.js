var config = require('./config'),
    extend = require('deep-extend'),
    pixi = require('pixi.js'),
    MessageScreen;

MessageScreen = function(game) {
    this.message = this.message || '';
    this.game = game;
    this.drawMessage();
    this.bind();

    return this;
};

MessageScreen.prototype.bind = function() {
    var self = this;

    this.game.on('setTextStyle', function(color) {
        self.setTextStyle(color);
    });

    this.game.on('resize', function() {
        self.resize();
    });

    return this;
};

MessageScreen.prototype.drawMessage = function() {
    this.msgText = new pixi.Text(this.message, config.TEXT_STYLE);

    this.hide();
    this.game.stage.addChild(this.msgText);
};

MessageScreen.prototype.setMessage = function(message) {
    this.msgText.setText(message);
};

MessageScreen.prototype.setTextStyle = function(style) {
    style = extend(config.TEXT_STYLE, style);
    this.msgText.style = style;
};

MessageScreen.prototype.resize = function() {
    this.msgText.position = {
        x: this.game.renderer.width / 2,
        y: this.game.renderer.height / 2
    };
    this.msgText.anchor = { x: 0.5, y: 0.5 };
};

MessageScreen.prototype.hide = function() {
    this.visible = false;
    this.msgText.visible = false;
    this.game.refresh();
};

MessageScreen.prototype.show = function() {
    this.visible = true;
    this.msgText.visible = true;
    this.game.refresh();
};


module.exports = MessageScreen;