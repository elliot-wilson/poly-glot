import { Game } from '../word_grid/game';

document.addEventListener("DOMContentLoaded", () => {

    
    const newGame = document.querySelector('.new-game');
    newGame.addEventListener("click", () => {
        const game = new Game ();
        window.game = game;

    });

});