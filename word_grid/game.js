import { Grid } from './grid.js';
import { ShapeUtil } from './shapeutil.js';

class Game {
    
    constructor (size = 7) {

        this.score = 0;
        this.wordDisplayList = document.querySelector(".word-display-list");
        
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
            this.scoreWord(word.value);
        }
        word.value = "";
    }

    scoreWord(word) {
        if (word.length === 4) {
            this.score += 1;
        }else if (word === this.grid.pangram) { 
            this.score += word.length + 16;
        }else {
            this.score += word.length;
        }
        console.log(this.score);
    }

    calculateLevel() {

    }

    renderLetters() {

        this.grid.lettersArr.forEach(letter => {
            let svg = ShapeUtil.createSVGelement(letter);
            ShapeUtil.createHexagon(letter);
            if (letter === this.grid.keyLetter) {
                svg.classList.add("central-letter");
            }
        });


    }

    addWord(word) {
        let wordElement = document.createElement("li");
        wordElement.innerText = word;
        this.wordDisplayList.appendChild(wordElement);
    }

    clearGame() {

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