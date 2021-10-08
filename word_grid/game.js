import { Grid } from './grid.js';

class Game {

    constructor () {
        this.grid = new Grid ();
        this.wordDisplay = document.querySelector(".word-display");

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
        const lettersDisplay = document.querySelector('.letter-list');

        this.grid.lettersArr.forEach(letter => {
            let letterDisplay = document.createElement("li");
            letterDisplay.innerText = letter;
            if (letter === this.grid.keyLetter) {
                letterDisplay.innerText += "   <--- key letter";
            }
            lettersDisplay.appendChild(letterDisplay);
        });

    }

    addWord(word) {
        let wordElement = document.createElement("li");
        wordElement.innerText = word;
        this.wordDisplay.appendChild(wordElement);
    }



}

export { Game };