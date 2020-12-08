class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.vy = -1;

    this.img = new Image();
    this.img.src = "assets/img/backgroundphoenix.png";
    this.img.isReady = false;
    this.img.onload = () => {
      this.img.isReady = true;
      this.img.width = this.ctx.canvas.width;
      this.img.height = this.ctx.canvas.height;
      this.width = this.img.width;
      this.height = this.img.height;
    };
  }

  draw() {
    if (this.img.isReady) {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y + this.height,
        this.width,
        this.height
      );
    }
  }

  move() {
    this.y += this.vy;
    if (this.y + this.height <= 0) {
      this.y = 0;
    }
  }
}
