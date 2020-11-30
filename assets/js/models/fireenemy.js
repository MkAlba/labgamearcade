class Fireenemy {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = 0;
        this.vy = -SPEED;
        
        this.sprite = new Image();
        this.sprite.src = 'assets/img/shootenemy.png'
        this.sprite.isReady = false;
        this.sprite.onload = () => {
            console.log('onload');
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
}