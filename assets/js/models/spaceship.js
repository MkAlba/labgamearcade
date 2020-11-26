class Spaceship {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.maxX = this.ctx.canvas.width;
        this.minX = 0;
        this.vx = 0;

        this.y = y;

        this.width = 0;
        this.height = 0;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/spaceship.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 4;
        this.sprite.verticalFrames = 1;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.onload = () => {
            console.log('loaded');
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width/this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height/this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        }

        this.movements = {
            right: false,
            left: false,
            //down: false,
            //space: false,
        }
   }

    onKeyEvent(event){
        const state = event.type === 'keydown';
        switch(event.keyCode) {
            case KEY_RIGHT:
                this.movements.right = state;
                break;
            case KEY_LEFT:
                this.movements.left = state;
                break;
        }
    }

    draw() {
        if(this.sprite.isReady) {
            this.ctx.drawImage (
                this.sprite,
                this.sprite.frameWidth * this.sprite.horizontalFrameIndex,
                this.sprite.frameHeight * this.sprite.verticalFrameIndex,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height,

            ) 
        }
    }

    move() {
        if (this.movements.right) {
            this.vx = SPEED;
        } else if (this.movements.left) {
                this.vx = -SPEED;
            } else {
                this.vx = 0;
                }
        
        this.x += this.vx;  
        
        if (this.x >= this.maxX-this.width/2) {
            this.x = this.maxX-this.width/2;
        } else if (this.x <= this.minX) {
            this.x = this.minX;
        }
    }
}