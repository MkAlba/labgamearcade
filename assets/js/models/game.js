class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 480;
        this.canvas.height = 640;
        this.ctx = this.canvas.getContext('2d');

        this.fps = 1000/60;
        this.intervalId = undefined;

        this.background = new Background(this.ctx);

    }

    onKeyEvent(event) {
        this.background.onKeyEvent(event);
    }

    start() {
        if(!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => { 
                this.clear();
                this.move();
                this.draw();
                
            }, this.fps);
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    stop() {
        clearInterval(this.drawIntervalID);
        this.drawIntervalID = undefined;
    }

    draw() {
        this.background.draw();
    }

    move() {
        this.background.move();
    }

}