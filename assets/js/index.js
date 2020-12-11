window.addEventListener("load", () => {
  const game = new Game("canvas-game", (score) => {
    document.getElementById("end-menu-container").classList.toggle("hidden");
    document.getElementById("canvas-container").classList.toggle("hidden");
  });

  const restartBtn = document.getElementById("replay-btn");
  restartBtn.addEventListener("click", () => {
    document.getElementById("game-sound").play();
    document.getElementById("end-menu-container").classList.toggle("hidden");
    document.getElementById("canvas-container").classList.toggle("hidden");

    game.restart();
  });

  const startBtn = document.getElementById("play-btn");
  startBtn.addEventListener("click", () => {
    document.getElementById("game-sound").play();
    document.getElementById("start-menu-container").classList.toggle("hidden");
    document.getElementById("canvas-container").classList.toggle("hidden");
    game.start();
  });

  document.addEventListener("keyup", (event) => {
    game.onKeyEvent(event);
  });

  document.addEventListener("keydown", (event) => {
    game.onKeyEvent(event);
  });
});
