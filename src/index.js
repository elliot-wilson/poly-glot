import { Game } from '../components/game';

document.addEventListener("DOMContentLoaded", () => {
    let game = new Game ();

    let boundKeyLogger = game.processKeyLogEvent.bind(game);
    document.addEventListener('keydown', boundKeyLogger);
    
    const newGame = document.querySelector('.new-game');
    
    newGame.addEventListener("click", () => {
        document.removeEventListener('keydown', boundKeyLogger);

        game = new Game ();

        boundKeyLogger = game.processKeyLogEvent.bind(game);
        document.addEventListener('keydown', boundKeyLogger);

    });

});