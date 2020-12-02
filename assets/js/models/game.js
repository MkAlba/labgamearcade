class Game {
    constructor(canvasId, onGameEnd) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 650;
        this.canvas.height = 850;
        this.ctx = this.canvas.getContext('2d');
        
        this.fps = 1000/60;
        this.intervalId = undefined;
        
        this.background = new Background(this.ctx);
        this.spaceship = new Spaceship(this.ctx, this.canvas.width/2, 780);

        this.enemies = [
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.10), Math.floor(this.canvas.height* 0.20)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.20), Math.floor(this.canvas.height* 0.20)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.30), Math.floor(this.canvas.height* 0.20)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.40), Math.floor(this.canvas.height* 0.20)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.50), Math.floor(this.canvas.height* 0.20)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.60), Math.floor(this.canvas.height* 0.20)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.70), Math.floor(this.canvas.height* 0.20)),    
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.80), Math.floor(this.canvas.height* 0.20)),  
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.10), Math.floor(this.canvas.height* 0.15)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.20), Math.floor(this.canvas.height* 0.15)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.30), Math.floor(this.canvas.height* 0.15)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.40), Math.floor(this.canvas.height* 0.15)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.50), Math.floor(this.canvas.height* 0.15)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.60), Math.floor(this.canvas.height* 0.15)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.70), Math.floor(this.canvas.height* 0.15)),    
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.80), Math.floor(this.canvas.height* 0.15)), 
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.10), Math.floor(this.canvas.height* 0.10)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.20), Math.floor(this.canvas.height* 0.10)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.30), Math.floor(this.canvas.height* 0.10)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.40), Math.floor(this.canvas.height* 0.10)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.50), Math.floor(this.canvas.height* 0.10)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.60), Math.floor(this.canvas.height* 0.10)),
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.70), Math.floor(this.canvas.height* 0.10)),    
            new Enemy(this.ctx, Math.floor(this.canvas.width * 0.80), Math.floor(this.canvas.height* 0.10)),   
        ];     
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
                this.checkCollisions();                
            }, this.fps);
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.spaceship.clear();
        this.enemies.forEach(enemy => enemy.clear()); 
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
        this.enemies.forEach(enemy => {
            if(enemy.x + enemy.vx + enemy.width > this.ctx.canvas.width){
                this.moveRight();
            } else if (enemy.x + enemy.vx < 0 ) {
                this.moveLeft();
            } else {
                enemy.move()
            }
            if(enemy.collidesWith(this.spaceship) || enemy.y + enemy.vy + enemy.height > this.ctx.canvas.height-this.spaceship.height - enemy.height){
                this.stopGame();
            }
        });             
    }
    
    moveRight() {
        this.enemies.forEach(enemy => enemy.moveRight())
    }
    moveLeft() {
        this.enemies.forEach(enemy => enemy.moveLeft())
    }

    checkCollisions() {              
        for (let i=0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i]
            let collides = false;    
            for (let j=0; j < this.spaceship.bullets.length; j++) {
                let bullet = this.spaceship.bullets[j]
                if (bullet.collidesWith(enemy)) {
                    collides = true;
                    this.spaceship.bullets.splice(j,1);
                    break;
                }
            }
            if (collides) {
            this.enemies.splice(i, 1)  
            }
        }
    } 

    stopGame() {
        clearInterval(this.drawIntervalId);
        this.clear()
    }

    endGame() {
        this.stopGame()        
    }
}
