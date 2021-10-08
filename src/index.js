import { Game } from '../word_grid/game';
window.Game = Game;

document.addEventListener("DOMContentLoaded", () => {
    
    const newGame = document.querySelector('.new-game');
    newGame.addEventListener("click", () => {
        const game = new Game ();
        console.log(game.grid);
    });

});