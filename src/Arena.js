var pixi = require('pixi.js'),
    config = require('./config'),
    parseOctal = require('./utils').parseOctal,
    extend = require('deep-extend'),
    Arena;

Arena = function(game) {
    this.game = game;
    this.linesColor = config.LINES_COLOR;
    this.linesWidth = config.LINES_WIDTH;
    this.scoreDisplayColor = config.SCORES_BACKGROUND_COLOR;
    this.scoreDisplayHeight = config.SCORES_BACKGROUND_HEIGHT;

    this.drawLines();
    this.bind();
};

Arena.prototype.bind = function() {
    var self = this;

    this.game.on('resize', function() {
        self.resize();
    });

    this.game.on('setLinesColor', function(color) {
        self.setLinesColor(color);
    });

    this.game.on('setLinesWidth', function(width) {
        self.setLinesWidth(width);
    });

    this.game.on('setScoreDisplayColor', function(color) {
        self.setScoreDisplayColor(color);
    });

    this.game.on('setScoreDisplayHeight', function(height) {
        self.setScoreDisplayHeight(height);
    });
};

Arena.prototype.setScoreDisplayColor = function(color) {
    this.scoreDisplayColor = parseOctal(color);
    this.updateScoreBoardStyle();
};

Arena.prototype.setScoreDisplayHeight = function(height) {
    this.scoreDisplayHeight = parseInt(height);
    this.updateScoreBoardStyle();
};

Arena.prototype.setLinesColor = function(color) {
    this.linesColor = parseOctal(color);
    this.updateLines();
};

Arena.prototype.setLinesWidth = function(width) {
    this.linesWidth = parseInt(width);
    this.updateLines();
};

Arena.prototype.getLinePositions = function() {
    var halfLineWidth = this.linesWidth / 2;
    return [
        // 1st line
        config.LINES_DISTANCE - halfLineWidth,
        // middle line
        (this.game.renderer.width / 2) - halfLineWidth,
        // 2nd line
        (this.game.renderer.width - config.LINES_DISTANCE) - halfLineWidth
    ];
};

Arena.prototype.drawLines = function() {
    var positions = this.getLinePositions();

    this.lines = [];

    for (var i = 0; i < positions.length; i += 1) {
        this.lines[i] = new pixi.Graphics();
        this.game.stage.addChild(this.lines[i]);
    }

    this.scoreBoardBackground = new pixi.Graphics();
    this.game.stage.addChild(this.scoreBoardBackground);
};

Arena.prototype.updateScoreBoardStyle = function() {
    this.scoreBoardBackground.clear();
    this.scoreBoardBackground.beginFill(this.scoreDisplayColor, 1);
    this.scoreBoardBackground.drawRect(0, 0, this.game.renderer.width, this.scoreDisplayHeight);
    this.scoreBoardBackground.endFill();
}

Arena.prototype.updateLines = function() {
    var positions = this.getLinePositions();

    for (var i = 0; i < positions.length; i += 1) {
        this.lines[i].clear();
        this.lines[i].beginFill(this.linesColor, 1);
        this.lines[i].drawRect(0, 0, this.linesWidth, this.game.renderer.height);
        this.lines[i].endFill();
        this.lines[i].position.x = positions[i];
    }
};

Arena.prototype.resize = function() {
    this.updateLines();
    this.updateScoreBoardStyle();
};

module.exports = Arena;