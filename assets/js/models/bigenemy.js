class bigEnemy {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.vx = 2;
    this.y = y;
    this.vy = 2;

    this.sprite = new Image();
    this.sprite.src = "assets/img/bigenemies.png";
    this.sprite.isReady = false;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 3;
    this.sprite.verticalFrames = 1;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(
        this.sprite.width / this.sprite.horizontalFrames
      );
      this.sprite.frameHeight = Math.floor(
        this.sprite.height / this.sprite.verticalFrames
      );
      this.width = this.sprite.frameWidth;
      this.height = this.sprite.frameHeight;
    };
    this.drawCount = 0;

    this.bullets = [];
  }

  isReady() {
    return this.sprite.isReady;
  }

  shoot() {
    if (this.bullets.length < 1) {
      this.bullets.push(
        new Fireenemy(this.ctx, this.x + this.width / 2, this.y + this.height)
      );
    }
  }

  clear() {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y <= this.ctx.canvas.height
    );
  }

  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.frameWidth * this.sprite.horizontalFrameIndex,
        this.sprite.frameHeight * this.sprite.verticalFrameIndex,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.bullets.forEach((bullet) => bullet.draw());
      this.drawCount++;
      this.animate();
    }
  }

  collidesWith(element) {
    return (
      this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y
    );
  }

  move() {
    this.bullets.forEach((bullet) => bullet.move());
    this.x += this.vx;
    this.y += this.vy;
  }
  moveRight() {
    this.vx = -2;
    this.vy = GRAVITYBIG;
  }

  moveLeft() {
    this.vx = 2;
  }

  moveRandom() {}

  animate() {
    this.animateSprite(0, 0, 3, 5);
  }

  animateSprite(initVerticalFrame, initHorizontalFrame, segments, frequency) {
    if (this.sprite.verticalFrameIndex !== initVerticalFrame) {
      this.sprite.verticalFrameIndex = initVerticalFrame;
      this.sprite.horizontalFrameIndex = initHorizontalFrame;
    } else if (this.drawCount % frequency === 0) {
      this.sprite.horizontalFrameIndex =
        (this.sprite.horizontalFrameIndex + 1) % segments;
      this.drawCount = 0;
    }
  }
}
