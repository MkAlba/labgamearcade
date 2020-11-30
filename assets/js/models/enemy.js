class Enemy {
    constructor (ctx,x,y) {
        this.ctx = ctx;
        this.x = x;
        this.vx = 1;
        this.y = y;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/enemies.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrameIndex = 3;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 4;
        this.sprite.verticalFrames = 1;
         this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        }
        this.drawCount = 0;
        
        this.autoFire = true;
        this.enemyBullets = [];
       
    }

    isReady() {
        return this.sprite.isReady;
    }

    onKeyEvent(event){
        const state = event.type === 'keydown';
        if(this.autoFire) {
            this.enemyBullets.push(new Fireenemy(this.ctx, this.x + this.width/2, this.y));
            this.autoFire = false;
            setInterval(() => this.autoFire = true, 200) ;
        }
    }
    
    clear() {
        this.enemyBullets = this.enemyBullets.filter(enemyBullet => enemyBullet.y <= this.canvas.height)
    }

    draw() {
        if(this.sprite.isReady) {
            this.ctx.drawImage(
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
            this.drawCount++;
            this.enemyBullets.forEach(enemyBullet => enemyBullet.draw());
        }
    }

    collidesWith(element) {
        return this.x < element.x + element.width &&
          this.x + this.width > element.x &&
          this.y < element.y + element.height &&
          this.y + this.height > element.y;
        }
    
    move() {
        this.enemyBullets.forEach(enemyBullet => enemyBullet.move());
     
    }

}

/*animateSprite (initialVerticalIndex, initialHorizontalIndex,segments, frequency) {
    if (this.sprite.verticalFrameIndex != initialVerticalIndex) {
        this.sprite.verticalFrameIndex = initialVerticalIndex;
        this.sprite.horizontalFrameIndex = initialHorizontalIndex;
    } else if (this.sprite.drawCount % frequency === 0) {
        this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex +1) % segments;
        this.drawCount= 0;
    }
*/
