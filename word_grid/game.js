import { Grid } from './grid.js';
import { ShapeUtil } from './shapeutil.js';

class Game {
    
    constructor (size = 7) {

        this.score = 0;
        this.wordDisplayList = document.querySelector(".word-display-list");
        
        this.clearGame();
        
        this.grid = new Grid ();
        this.level = this.calculateLevel();
        this.words = [];
        
        this.renderLetters();
    }

    logKey(event) {
        let input = document.querySelector('#guessed-word');
        let alphabet = "abcdefghijklmnopqrstuvwxyz";

        if (input.classList.contains("blank")) {
            input.innerText = "";
            input.classList.remove("blank");
        }

        
        if (alphabet.includes(event.key)) {
            input.innerText += event.key;
            if (this.grid.lettersArr.includes(event.key)){
                this.changeKeyColor(event);
            }
        }else if (event.key === "Enter"){
            this.submitWord();
        }else if (event.key === "Backspace") {
            input.innerText = input.innerText.slice(0, input.innerText.length - 1);
        }
        
        if (input.innerText.length === 0) {
            this.resetInputElement(input);
        }
    }

    changeKeyColor(event) {
        let container = document.querySelector(`.${event.key}-container`);
        container.classList.add("clicked-letter");
        setTimeout(() => {
            container.classList.remove("clicked-letter");
        }, 175);
    }


    resetInputElement(inputElement){
        inputElement.classList.add("blank");
        inputElement.innerText = "Type or click";
    }

    submitWord(event) {
        if (event) event.preventDefault();

        let input = document.querySelector('#guessed-word');
        let word = input.innerText.trim();
        if (this.grid.wordbank.includes(word) && !this.words.includes(word)) {
            this.addWord(word);
            this.displayScore(word);
            this.calculateLevel();
            setTimeout(this.clearResult, 1250);
        }else {
            this.displayError(word);
            setTimeout(this.clearResult, 1250);
        }
        this.resetInputElement(input);
    }


    displayError(word) {

        let errorMessage;

        if (word.length < 4) {
            errorMessage = "words must be 4 letters or more";
        }else if (!word.includes(this.grid.keyLetter)) {
            errorMessage = "words must include center letter";
        }else if (this.words.includes(word)) {
            errorMessage = "word already submitted";
        }else{
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
        this.words.push(word);
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