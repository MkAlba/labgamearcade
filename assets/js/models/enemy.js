class Enemy {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.vx = 1;
    this.y = y;
    this.vy = 0;

    this.sprite = new Image();
    this.sprite.src = "assets/img/enemies.png";
    this.sprite.isReady = false;
    this.sprite.horizontalFrameIndex = 3;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 4;
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
  /*  moveTo(a,b) {
      this.x += a;
      this.y += b;
  }*/

  moveRight() {
    this.vx = -1;
    this.vy = GRAVITY;
  }

  moveLeft() {
    this.vx = 1;
  }
}
