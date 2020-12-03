class Firespace {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vy = SPEED;
        
        this.sprite = new Image();
        this.sprite.src = 'assets/img/shootspace.png'
        this.sprite.isReady = false;
        this.sprite.onload = () => {
            this.isReady = true;
            this.width = this.sprite.width;
            this.height = this.sprite.height;
        }    
        this.drawCount = 0;
    }

    draw() {  
        this.ctx.drawImage (
            this.sprite,
            this.x,
            this.y,
            this.width,
            this.height,
        )
        this.drawCount++;
    }

    move() {
        this.y -= this.vy         
    }
    
    collidesWith(element) {
        return this.x < element.x + element.width &&
          this.x + this.width > element.x &&
          this.y < element.y + element.height &&
          this.y + this.height > element.y;
        }
}