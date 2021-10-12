import { Game } from '../word_grid/game';

document.addEventListener("DOMContentLoaded", () => {
    let game = new Game ();

    let boundKeyLogger = game.logKey.bind(game);
    document.addEventListener('keydown', boundKeyLogger);
    
    window.game = game;
    
    const newGame = document.querySelector('.new-game');
    newGame.addEventListener("click", () => {
        document.removeEventListener('keydown', boundKeyLogger);
        game = new Game ();
        boundKeyLogger = game.logKey.bind(game);
        document.addEventListener('keydown', boundKeyLogger);
        window.game = game;

    });

});