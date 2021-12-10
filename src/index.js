import { Game } from '../components/game';
import { activateInstructionModalListener } from '../components/modal_util';

document.addEventListener("DOMContentLoaded", () => {
    let game = new Game ();
    
    let boundKeyLogger = game.processKeyLogEvent.bind(game);
    document.addEventListener('keydown', boundKeyLogger);
    
    activateInstructionModalListener();

    const newGame = document.querySelector('.new-game');
    
    newGame.addEventListener("click", () => {
        let loadingModal = document.getElementById('loading-modal');
        loadingModal.style.display = "block";
        document.removeEventListener('keydown', boundKeyLogger);
        setTimeout(function () {
            game = new Game();
            boundKeyLogger = game.processKeyLogEvent.bind(game);
            document.addEventListener('keydown', boundKeyLogger);
        }, 650)

    });

});