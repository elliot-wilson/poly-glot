import { Grid } from './grid.js';

class Game {
    
    constructor () {

        
        this.wordDisplay = document.querySelector(".word-display");
        this.lettersDisplay = document.querySelector('.letter-list');
        
        this.clearGame();
        
        this.grid = new Grid ();
        
        
        this.renderletters();
        this.bindEvents();
    }

    bindEvents() {
        const submitButton = document.querySelector('#word-guess-form');
        submitButton.addEventListener("submit", e => {
            e.preventDefault();

            let word = document.querySelector('#guessed-word');
            if (this.grid.wordbank.includes(word.value)) {
                this.addWord(word.value);
            }

            word.value = "";
        });
    }

    renderletters() {

        this.grid.lettersArr.forEach(letter => {
            let letterDisplay = document.createElement("li");
            letterDisplay.innerText = letter;
            if (letter === this.grid.keyLetter) {
                letterDisplay.innerText += "   <--- key letter";
            }
            this.lettersDisplay.appendChild(letterDisplay);
        });

    }

    addWord(word) {
        let wordElement = document.createElement("li");
        wordElement.innerText = word;
        this.wordDisplay.appendChild(wordElement);
    }

    clearGame() {
        let children = this.lettersDisplay.children;

        while (children.length > 0) {
            children[0].remove();
        }
    }



}

export { Game };