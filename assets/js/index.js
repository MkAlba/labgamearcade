window.addEventListener("load", () => {
  const game = new Game("canvas-game");
  const startBtn = document.getElementById("play-btn");
  startBtn.addEventListener("click", () => {
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
