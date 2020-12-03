
window.addEventListener('load', () => {
    const game = new Game('canvas-game');
    game.start();

document.addEventListener('keyup', (event) => {
    game.onKeyEvent(event);
    });

document.addEventListener('keydown', (event) => {
    game.onKeyEvent(event);
    });

document.addEventListener('click', (event) => {
        game.onKeyEvent(event);
        });

})