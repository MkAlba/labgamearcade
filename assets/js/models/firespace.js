class Firespace {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vy = SPEED;
        
        this.sprite = new Image();
        this.sprite.src = 'assets/img/shootspace.png'
        this.sprite.isReady = false;
    ////    this.sprite.horizontalFrameIndex = 0;
     //   this.sprite.verticalFrameIndex = 0;
    //    this.sprite.horizontalFrames = 1;
    //   this.sprite.verticalFrames = 1;
        this.sprite.onload = () => {
            this.isReady = true;
            this.width = this.sprite.width;
            this.height = this.sprite.height;
        }     
    }

    draw() {
        this.ctx.drawImage (
            this.sprite,
            this.x,
            this.y,
            this.width,
            this.height,

        )
    }

    move() {

        this.y -= this.vy
         
    }
    
    
}