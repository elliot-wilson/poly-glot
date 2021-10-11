import { Grid } from './grid.js';
import { ShapeUtil } from './shapeutil.js';

class Game {
    
    constructor (size = 7) {

        
        this.wordDisplayList = document.querySelector(".word-display-list");
        this.lettersDisplay = document.querySelector('.letter-list');
        
        this.clearGame();

        this.grid = new Grid ();
        
        this.renderLetters();
        this.bindEvents();
    }
    
    bindEvents() {
        this.createForm();
        const submitButton = document.querySelector('#word-guess-form');
        const boundSubmitWord = this.submitWord.bind(this);
        submitButton.addEventListener("submit", boundSubmitWord);
        submitButton.classList.add("listener-event");
    }

    createForm() {
        let submitWordForm = document.createElement("form");
        submitWordForm.setAttribute("id", "word-guess-form");

        let submitWordText = document.createElement("input");
        submitWordText.setAttribute("type", "text");
        submitWordText.setAttribute("id", "guessed-word");

        let submitWordButton = document.createElement("input");
        submitWordButton.setAttribute("type", "submit");
        submitWordButton.setAttribute("value", "submit");

        submitWordForm.appendChild(submitWordText);
        submitWordForm.appendChild(submitWordButton);

        let board = document.querySelector('.board');
        let display = document.querySelector('.word-display');
        board.insertBefore(submitWordForm, display);

    }

    submitWord(event) {
        event.preventDefault();
        console.log(this);
        console.log(this.grid.wordbank);
        let word = document.querySelector('#guessed-word');
        console.log(word.value);
        if (this.grid.wordbank.includes(word.value)) {
            this.addWord(word.value);
        }
        word.value = "";
    }

    renderLetters() {

        this.grid.lettersArr.forEach(letter => {
            ShapeUtil.createSVGelement(letter);
            let letterDisplay = document.createElement("li");
            if (letter === this.grid.keyLetter) {
                letterDisplay.classList.add("central-letter");
            }
            letterDisplay.innerText = letter;
            this.lettersDisplay.appendChild(letterDisplay);
            ShapeUtil.createHexagon(letter);
        });


    }

    addWord(word) {
        let wordElement = document.createElement("li");
        wordElement.innerText = word;
        this.wordDisplayList.appendChild(wordElement);
    }

    clearGame() {
        let letters = this.lettersDisplay.children;

        while (letters.length > 0) {
            letters[0].remove();
        }

        let words = this.wordDisplayList.children;

        while (words.length > 0) {
            words[0].remove();
        }

        let svgs = document.querySelector('.polygon-container').children;

        while (svgs.length > 0) {
            svgs[0].remove();
        }

        const submitForm = document.querySelector('#word-guess-form');
        if (submitForm !== null) submitForm.remove();
    }



}

export { Game };