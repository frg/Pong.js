var Touch;

Touch = function(game, player) {
    this.game = game;
    this.player = player;
    this.touching = null;
    this.enabled = false;
    this.bind();
};

Touch.prototype.bind = function() {
    var self = this;

    document.addEventListener('touchstart', handleTouchDownEvent, false);
    document.addEventListener("touchmove", handleTouchDownEvent, false);

    function handleTouchDownEvent(event) {
        self.touching = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        };
    }

    document.addEventListener('touchend', function handleTouchUpEvent(event) {
        self.touching = null;
    }, false);

};

Touch.prototype.enable = function() {
    this.enabled = true;
};

Touch.prototype.disable = function() {
    this.enabled = false;
};

Touch.prototype.isTouchingUp = function() {
    return this.calculateTouchingState() === 1;
};

Touch.prototype.isTouchingDown = function() {
    return this.calculateTouchingState() === -1;
};

Touch.prototype.calculateTouchingState = function() {
    if (this.enabled === true && this.touching !== null) {
        // check if touch event is within control distance of player
        if (this.touching.y < Number.MAX_SAFE_INTEGER && this.touching.y > Number.MIN_SAFE_INTEGER) {
            // within y range of player
            var playerXCenter = this.player.graphics.x + (this.player.width / 2);
            var controlBoundary = this.game.renderer.width / 3;
            if (this.touching.x < (playerXCenter + controlBoundary) && this.touching.x > (playerXCenter - controlBoundary)) {
                // within x range of player

                var playerYCenter = this.player.graphics.y + (this.player.height / 2);
                // determine direction
                if ((this.touching.y + 10) < playerYCenter) {
                    // is touching up
                    return 1;
                } else if ((this.touching.y - 10) > playerYCenter) {
                    // is touching down
                    return -1;
                }
            }
        }
    }

    // is not touching
    return 0;
}

module.exports = Touch;