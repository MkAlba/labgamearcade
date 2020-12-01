class Spaceship {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.maxX = this.ctx.canvas.width;
        this.minX = 0;
        this.vx = 0;
        this.y = y;
        this.minY = 0;

        this.width = 0;
        this.height = 0;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/spaceship.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 3;
        this.sprite.verticalFrames = 1;
        this.sprite.horizontalFrameIndex = 2;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width/this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height/this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
            this.x = x - this.width /2;
        } 

        this.movements = {
            right: false,
            left: false,
            //down: false,
       }
      
        this.canFire = true;
        this.bullets = [];
       
        this.sounds = {
            fire: new Audio('assets/sounds/soundshootspace.wav')
        }
    }

    isReady() {
        return this.sprite.isReady;
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
            case KEY_FIRE:
                if(this.canFire) {
                    this.animateShoot();
                    this.bullets.push(new Firespace(this.ctx, this.x + this.width/2, this.y));
                    this.sounds.fire.currentTime = 0;
                    this.sounds.fire.play();
                    this.canFire = false;
                    setTimeout(() => this.canFire = true, 200) ;
                 break;
                }
        }
    }

    clear() {
        this.bullets = this.bullets.filter(bullet => bullet.y >= 0)
    }

    draw() {
        console.log('bullets:', this.bullets.length)
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
            this.bullets.forEach(bullet => bullet.draw());
            this.sprite.drawCount++;
            this.animateShoot();
        }
    }

    move() {
        this.bullets.forEach(bullet => bullet.move());

        if (this.movements.right) {
            this.vx = SPEED;
        } else if (this.movements.left) {
                this.vx = -SPEED;
            } else {
                this.vx = 0;
                }
        
        this.x += this.vx;  
        
        if (this.x >= this.maxX - this.width) {
            this.x = this.maxX - this.width;
        } else if (this.x <= this.minX) {
            this.x = this.minX;
        }
    }

    animateShoot() {
        if (this.canFire) {
            this.sprite.horizontalFrameIndex = 2;
            this.sprite.verticalFrameIndex = 0;
        } else { 
            this.resetAnimation()
        }
    }

    resetAnimation() {
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
    }
    
    collidesWith(element) {
        return this.x < element.x + element.width &&
          this.x + this.width > element.x &&
          this.y < element.y + element.height &&
          this.y + this.height > element.y;
        }
 }