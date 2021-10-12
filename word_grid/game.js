import { Grid } from './grid.js';
import { ShapeUtil } from './shapeutil.js';

class Game {
    
    constructor (size = 7) {

        this.score = 0;
        this.wordDisplayList = document.querySelector(".word-display-list");
        
        this.clearGame();
        
        this.grid = new Grid ();
        this.level = this.calculateLevel();
        
        this.renderLetters();
        this.bindEvents();
    }
    
    bindEvents() {
        this.createForm();

        const submitButton = document.querySelector('#word-guess-form');
        const boundSubmitWord = this.submitWord.bind(this);

        submitButton.addEventListener("submit", boundSubmitWord);
        submitButton.classList.add("listener-event");

        document.addEventListener('keydown', this.logKey.bind(this));
    }

    logKey(event) {
        console.log(this);
        let input = document.querySelector('#guessed-word');
        let alphabet = "abcdefghijklmnopqrstuvwxyz";
        if (alphabet.includes(event.key)) {
            input.value += event.key;
        }else if (event.key === "Backspace") {
            input.value = input.value.slice(0, input.value.length - 1);
        }else if (event.key === "Enter"){
            this.submitWord();
        }
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
        board.appendChild(submitWordForm);

    }

    submitWord(event) {
        if (event) event.preventDefault();

        let input = document.querySelector('#guessed-word');
        let word = input.value.trim();
        if (this.grid.wordbank.includes(word)) {
            this.addWord(word);
            this.displayScore(word);
            this.calculateLevel();
        }else {
            this.displayError(word);
        }
        setTimeout(this.clearResult, 1250);
        input.value = "";
    }


    displayError(word) {

        let errorMessage;

        if (word.length < 4) {
            errorMessage = "words must be 4 letters or more";
        }else if (!word.includes(this.grid.keyLetter)) {
            errorMessage = "words must include center letter";
        }else {
            errorMessage = "invalid word";
        }

        let resultDisplay = document.querySelector('.result-display-text');

        resultDisplay.innerText = errorMessage;

    }

    clearResult() {
        let resultDisplay = document.querySelector('.result-display-text');
        resultDisplay.innerText = "";
    }

    calculateScore(word) {
        let score = 0;
        if (word.length === 4) {
            score += 1;
        }else if (this.grid.pangrams.includes(word)) { 
            score += word.length + 7;
        }else {
            score += word.length;
        }
        return score;
    }

    displayScore (word) {
        let score = this.calculateScore(word);

        this.score += score;

        let resultDisplay = document.querySelector('.result-display-text');
        let text = score > 1 ? `${score} points!` : `${score} point!`;
        if (this.grid.pangrams.includes(word)) text += " pangram!";
        resultDisplay.innerText = text;

        let scoreDisplay = document.querySelector(".score-text");
        scoreDisplay.innerText = this.score;
    }

    calculateLevel() {

        let maxScore = this.grid.maxScore;

        let scorePercentage = this.score / maxScore;

        let level;

        if (scorePercentage < .05) {
            level = "Getting Started";
        }else if (scorePercentage < .20) {
            level = "Good";
        }else if (scorePercentage < .30) {
            level = "Impressive";
        }else if (scorePercentage < .40) {
            level = "Great";
        }else if (scorePercentage < .50) {
            level = "Amazing";
        }else if (scorePercentage < .60) {
            level = "Polymath";
        }else {
            level = "Savant";
        }

        this.level = level;
        console.log(level);
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