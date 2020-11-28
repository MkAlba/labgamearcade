class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 650;
        this.canvas.height = 850;
        this.ctx = this.canvas.getContext('2d');

        
        this.fps = 1000/60;
        this.intervalId = undefined;
        
        this.background = new Background(this.ctx);
        this.spaceship = new Spaceship(this.ctx, this.canvas.width/2, 780);

        this.enemies = [
            new Enemy(this.ctx, this.canvas.width * 0.10, this.canvas.height* 0.20),
            new Enemy(this.ctx, this.canvas.width * 0.20, this.canvas.height* 0.20),
            new Enemy(this.ctx, this.canvas.width * 0.30, this.canvas.height* 0.20),
            new Enemy(this.ctx, this.canvas.width * 0.40, this.canvas.height* 0.20),
            new Enemy(this.ctx, this.canvas.width * 0.50, this.canvas.height* 0.20),
            new Enemy(this.ctx, this.canvas.width * 0.60, this.canvas.height* 0.20),
            new Enemy(this.ctx, this.canvas.width * 0.70, this.canvas.height* 0.20),       
            new Enemy(this.ctx, this.canvas.width * 0.80, this.canvas.height* 0.20),       
            new Enemy(this.ctx, this.canvas.width * 0.90, this.canvas.height* 0.20),       
        ]
    }

    onKeyEvent(event) {
        
        this.spaceship.onKeyEvent(event);
       

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
        this.spaceship.clear();
    }

    stop() {
        clearInterval(this.drawIntervalID);
        this.drawIntervalID = undefined;
    }

    draw() {
        this.background.draw();
        this.spaceship.draw();
        this.enemies.forEach(enemy => enemy.draw());
    }

    move() {
        this.background.move();
        this.spaceship.move();              
    }
}