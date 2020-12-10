class Game {
  constructor(canvasId, onGameEnd) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = 650;
    this.canvas.height = 850;
    this.ctx = this.canvas.getContext("2d");
    this.onGameEnd = onGameEnd;
    this.fps = 1000 / 60;
    this.drawIntervalId = undefined;

    this.background = new Background(this.ctx);
    this.spaceship = undefined;
    this.sounds = {
      gameover: new Audio("assets/sounds/gameover.wav"),
    };

    this.enemies = [];
    this.crazyEnemies = [];
    this.drawCount = 0;
    this.attackers = [];

    this.bigEnemies = [];

    this.score = 0;
    this.bestScore = Number(localStorage.getItem("best-score") || 0);
    this.restart();
  }

  onKeyEvent(event) {
    this.spaceship.onKeyEvent(event);
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
        this.chooseAttackers();
        this.attackersShoot();
        this.chooseCrazyEnemies();
        this.checkCollisions();
        this.bigEnemiesShoot();
      }, this.fps);
    }
  }
  restart() {
    this.spaceship = new Spaceship(this.ctx, this.canvas.width / 2, 780);

    this.enemies = [
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.1),
        Math.floor(this.canvas.height * 0.2)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.2),
        Math.floor(this.canvas.height * 0.2)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.3),
        Math.floor(this.canvas.height * 0.2)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.4),
        Math.floor(this.canvas.height * 0.2)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.5),
        Math.floor(this.canvas.height * 0.2)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.6),
        Math.floor(this.canvas.height * 0.2)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.7),
        Math.floor(this.canvas.height * 0.2)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.8),
        Math.floor(this.canvas.height * 0.2)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.1),
        Math.floor(this.canvas.height * 0.15)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.2),
        Math.floor(this.canvas.height * 0.15)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.3),
        Math.floor(this.canvas.height * 0.15)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.4),
        Math.floor(this.canvas.height * 0.15)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.5),
        Math.floor(this.canvas.height * 0.15)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.6),
        Math.floor(this.canvas.height * 0.15)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.7),
        Math.floor(this.canvas.height * 0.15)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.8),
        Math.floor(this.canvas.height * 0.15)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.1),
        Math.floor(this.canvas.height * 0.1)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.2),
        Math.floor(this.canvas.height * 0.1)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.3),
        Math.floor(this.canvas.height * 0.1)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.4),
        Math.floor(this.canvas.height * 0.1)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.5),
        Math.floor(this.canvas.height * 0.1)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.6),
        Math.floor(this.canvas.height * 0.1)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.7),
        Math.floor(this.canvas.height * 0.1)
      ),
      new Enemy(
        this.ctx,
        Math.floor(this.canvas.width * 0.8),
        Math.floor(this.canvas.height * 0.1)
      ),
    ];
    this.crazyEnemies = [];
    this.drawCount = 0;
    this.attackers = [];

    this.bigEnemies = [];

    this.score = 0;
    this.start();
  }

  chooseAttackers() {
    if (this.enemies.length === 17) {
      for (let i = 0; this.attackers.length < 5; i++) {
        let randomNumber = Math.floor(Math.random() * this.enemies.length);
        this.attackers.push(this.enemies[randomNumber]);
        this.enemies.splice(randomNumber, 1);
      }
    }
  }

  attackersShoot() {
    this.attackers.forEach((enemy) => {
      enemy.shoot();
    });
  }
  bigEnemiesShoot() {
    this.bigEnemies.forEach((bigEnemy) => {
      bigEnemy.shoot();
    });
  }

  chooseCrazyEnemies() {
    if (this.enemies.length === 21) {
      for (let i = 0; this.crazyEnemies.length < 3; i++) {
        let randomNumber = Math.floor(Math.random() * this.enemies.length);
        this.crazyEnemies.push(this.enemies[randomNumber]);
        this.enemies.splice(randomNumber, 1);
      }
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.spaceship.clear();
    this.enemies.forEach((enemy) => enemy.clear());
    this.attackers.forEach((attacker) => attacker.clear());
    this.crazyEnemies.forEach((crazyEnemy) => crazyEnemy.clear());
    this.bigEnemies.forEach((bigEnemy) => bigEnemy.clear());
  }

  draw() {
    this.background.draw();
    this.spaceship.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.attackers.forEach((attacker) => attacker.draw());
    this.crazyEnemies.forEach((crazyEnemy) => crazyEnemy.draw());
    this.bigEnemies.forEach((bigEnemy) => bigEnemy.draw());
    this.drawCount++;

    this.drawScore();
  }

  move() {
    this.background.move();
    this.spaceship.move();

    this.enemies.forEach((enemy) => {
      if (enemy.x + enemy.vx + enemy.width > this.ctx.canvas.width) {
        this.moveRight();
      } else if (enemy.x + enemy.vx < 0) {
        this.moveLeft();
      } else {
        enemy.move();
      }
    });
    this.attackers.forEach((attacker) => {
      if (attacker.x + attacker.vx + attacker.width > this.ctx.canvas.width) {
        attacker.moveRight();
      } else if (attacker.x + attacker.vx < 0) {
        attacker.moveLeft();
      } else {
        attacker.move();
      }
    });

    this.crazyEnemies.forEach((crazyEnemy) => {
      if (
        crazyEnemy.x + crazyEnemy.vx + crazyEnemy.width >
        this.ctx.canvas.width
      ) {
        crazyEnemy.moveRight();
      } else if (crazyEnemy.x + crazyEnemy.vx < 0) {
        crazyEnemy.moveLeft();
      } else {
        crazyEnemy.move();
      }
    });

    this.bigEnemies.forEach((bigEnemy) => {
      if (bigEnemy.x + bigEnemy.vx + bigEnemy.width > this.ctx.canvas.width) {
        this.moveRight();
      } else if (bigEnemy.x + bigEnemy.vx < 0) {
        this.moveLeft();
      } else {
        bigEnemy.move();
      }
    });
  }

  moveRight() {
    this.enemies.forEach((enemy) => enemy.moveRight());
    this.attackers.forEach((attacker) => attacker.moveRight());
    //  this.crazyEnemies.forEach((crazyEnemy) => crazyEnemy.moveRight());
    this.bigEnemies.forEach((bigEnemy) => bigEnemy.moveRight());
  }
  moveLeft() {
    this.enemies.forEach((enemy) => enemy.moveLeft());
    this.attackers.forEach((attacker) => attacker.moveLeft());
    //this.crazyEnemies.forEach((crazyEnemy) => crazyEnemy.moveLeft());
    this.bigEnemies.forEach((bigEnemy) => bigEnemy.moveLeft());
  }

  checkCollisions() {
    for (let i = 0; i < this.enemies.length; i++) {
      let enemy = this.enemies[i];
      let collides = false;
      for (let j = 0; j < this.spaceship.bullets.length; j++) {
        let bullet = this.spaceship.bullets[j];
        if (bullet.collidesWith(enemy)) {
          collides = true;
          this.spaceship.bullets.splice(j, 1);
          break;
        }
      }
      if (collides) {
        this.enemies.splice(i, 1);
        this.score++;
        if (this.enemies.length === 0) {
          this.generateBigEnemy();
        }
      }
      if (
        enemy.collidesWith(this.spaceship) ||
        enemy.y + enemy.vy + enemy.height >
          this.ctx.canvas.height - this.spaceship.height - enemy.height
      ) {
        this.stopGame();
      }
    }
    for (let i = 0; i < this.crazyEnemies.length; i++) {
      let crazy = this.crazyEnemies[i];
      let collides = false;
      for (let j = 0; j < this.spaceship.bullets.length; j++) {
        let bullet = this.spaceship.bullets[j];
        if (bullet.collidesWith(crazy)) {
          collides = true;
          this.spaceship.bullets.splice(j, 1);
          break;
        }
      }
      if (collides) {
        this.crazyEnemies.splice(i, 1);
        this.score++;
      }
      if (
        crazy.collidesWith(this.spaceship) ||
        crazy.y + crazy.vy + crazy.height >
          this.ctx.canvas.height - this.spaceship.height - crazy.height
      ) {
        this.stopGame();
      }
    }
    for (let i = 0; i < this.attackers.length; i++) {
      let attack = this.attackers[i];
      let collides = false;
      for (let j = 0; j < this.spaceship.bullets.length; j++) {
        let bullet = this.spaceship.bullets[j];
        if (bullet.collidesWith(attack)) {
          collides = true;
          this.spaceship.bullets.splice(j, 1);
          break;
        }
      }
      if (collides) {
        this.attackers.splice(i, 1);
        this.score++;
      }
      if (
        attack.collidesWith(this.spaceship) ||
        attack.y + attack.vy + attack.height >
          this.ctx.canvas.height - this.spaceship.height - attack.height
      ) {
        this.stopGame();
      }
    }

    for (let i = 0; i < this.bigEnemies.length; i++) {
      let bigEnemy = this.bigEnemies[i];
      let collides = false;
      for (let j = 0; j < this.spaceship.bullets.length; j++) {
        let bullet = this.spaceship.bullets[j];
        if (bullet.collidesWith(bigEnemy)) {
          collides = true;
          this.spaceship.bullets.splice(j, 1);
          break;
        }
      }
      if (collides) {
        this.bigEnemies.splice(i, 1);
        this.score++;
      }
    }

    for (let i = 0; i < this.attackers.length; i++) {
      let attacker = this.attackers[i];
      attacker.bullets.forEach((bullet) => {
        if (bullet.collidesWith(this.spaceship)) {
          this.stopGame();
        }
      });
    }

    for (let i = 0; i < this.bigEnemies.length; i++) {
      let bigEnemy = this.bigEnemies[i];
      bigEnemy.bullets.forEach((bullet) => {
        if (bullet.collidesWith(this.spaceship)) {
          this.stopGame();
        }
      });
      if (
        (bigEnemy.collidesWith(this.spaceship) ||
          bigEnemy.y + bigEnemy.vy + bigEnemy.height) >
        this.ctx.canvas.height - this.spaceship.height - bigEnemy.height
      ) {
        this.stopGame();
      }
    }
    this.continuesGame();
  }

  drawScore() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      "NAME: " + document.getElementById("input-name").value,
      this.ctx.canvas.width / 3,
      30
    );
    this.ctx.fillText("Score: " + this.score, this.ctx.canvas.width / 3, 50);
  }

  continuesGame() {
    if (this.bigEnemies.length === 0 && this.enemies.length === 0) {
      this.restart();
      this.score += 28;
    }
  }

  stopGame() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
    this.sounds.gameover.play();
    this.ctx.font = "40px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      "GAME OVER",
      (this.ctx.canvas.width - 220) / 2,
      (this.ctx.canvas.height - 100) / 2
    );
    this.ctx.fillText(
      "Game Score: " + this.score,
      (this.ctx.canvas.width - 240) / 2,
      this.ctx.canvas.height / 2
    );
    document.getElementById("game-sound").pause();
    setTimeout(() => {
      this.onGameEnd(this.score);
    }, 4000);
  }

  generateBigEnemy() {
    this.bigEnemies.push(new bigEnemy(this.ctx, 0, 0));
    this.bigEnemies.push(new bigEnemy(this.ctx, this.canvas.width / 2, 0));
    this.bigEnemies.push(new bigEnemy(this.ctx, this.canvas.width / 3, 0));
    this.bigEnemies.push(new bigEnemy(this.ctx, this.canvas.width / 4, 0));
  }
}
