var Mouse;

Mouse = function(game, player) {
    this.game = game;
    this.player = player;
    this.mousedown = null;
    this.enabled = false;
    this.bind();
};

Mouse.prototype.bind = function() {
    var self = this;

    document.addEventListener('mousedown', handleMouseDownEvent, false);
    document.addEventListener("mousemove", handleMouseDownEvent, false);

    function handleMouseDownEvent(event) {
        self.mousedown = {
            x: event.clientX,
            y: event.clientY
        };
    }

    document.addEventListener('mouseup', function handleTouchUpEvent(event) {
        self.mousedown = null;
    }, false);

};

Mouse.prototype.enable = function() {
    this.enabled = true;
};

Mouse.prototype.disable = function() {
    this.enabled = false;
};

Mouse.prototype.isMouseUp = function() {
    return this.calculateMouseState() === 1;
};

Mouse.prototype.isMouseDown = function() {
    return this.calculateMouseState() === -1;
};

Mouse.prototype.calculateMouseState = function() {
    if (this.enabled === true && this.mousedown !== null) {
        // check if touch event is within control distance of player
        if (this.mousedown.y < Number.MAX_SAFE_INTEGER && this.mousedown.y > Number.MIN_SAFE_INTEGER) {
            // within y range of player
            var playerXCenter = this.player.graphics.x + (this.player.width / 2);
            var controlBoundary = this.game.renderer.width / 3;
            if (this.mousedown.x < (playerXCenter + controlBoundary) && this.mousedown.x > (playerXCenter - controlBoundary)) {
                // within x range of player

                var playerYCenter = this.player.graphics.y + (this.player.height / 2);
                // determine direction
                if ((this.mousedown.y + 10) < playerYCenter) {
                    // is mouse highter than player
                    return 1;
                } else if ((this.mousedown.y - 10) > playerYCenter) {
                    // is mouse lower than player
                    return -1;
                }
            }
        }
    }

    // is not mouse down
    return 0;
}

module.exports = Mouse;