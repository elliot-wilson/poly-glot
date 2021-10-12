import { Game } from '../word_grid/game';

document.addEventListener("DOMContentLoaded", () => {
    let game = new Game ();
    window.game = game;
    
    const newGame = document.querySelector('.new-game');
    newGame.addEventListener("click", () => {
        game = new Game ();
        window.game = game;

    });

});