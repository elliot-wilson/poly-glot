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
        
        this.renderLetters(this.grid.lettersArr);
        this.bindEvents();
    }
    
    bindEvents () {
        this.registerClick();
        this.activateSubmitButton();
        this.registerDelete();
        this.registerScramble();
    }

    activateSubmitButton() {
        let submitButton = document.createElement('button');
        submitButton.classList.add('submit');
        submitButton.innerText = "Enter";
        
        let buttonDiv = document.querySelector('.button-div');
        let deleteButton = document.querySelector('.delete');
        buttonDiv.insertBefore(submitButton, deleteButton);
        
        submitButton.addEventListener('click', event => {
            this.submitWord();
        });
    }
    
    registerDelete() {
        let deleteButton = document.querySelector('.delete');
        let input = document.querySelector('#guessed-word');

        deleteButton.addEventListener('click', event => {
            this.resetInputElement(input);
        });
        
    }

    registerScramble() {
        let scrambleButton = document.querySelector('.refresh');
        scrambleButton.addEventListener('click', event => {
            this.clearPolygons();
            let shuffledLetters = this.shuffleLetters();
            this.renderLetters(shuffledLetters);
        });
    }

    registerClick() {
        let svgs = Array.from(document.querySelector('.polygon-container').children);

        svgs.forEach(svg => {
            svg.addEventListener("click", event => {
                let letter = event.currentTarget.children[1].innerHTML;
                this.processLetter(letter);
            });
        });
    }

    processKeyLogEvent(event) {
        let letter = event.key;
        this.processLetter(letter);
    }

    processLetter(letter) {
        let input = document.querySelector('#guessed-word');
        let alphabet = "abcdefghijklmnopqrstuvwxyz";

        if (input.classList.contains("blank")) {
            input.innerText = "";
            input.classList.remove("blank");
        }
        
        if (alphabet.includes(letter)) {
            input.innerText += letter;
            if (this.grid.lettersArr.includes(letter)){
                this.changeKeyColor(letter);
            }
        } else if (letter === "Enter"){
            this.submitWord();
        } else if (letter === "Backspace") {
            input.innerText = input.innerText.slice(0, input.innerText.length - 1);
        }

        if (input.innerText.length === 0) {
            this.resetInputElement(input);
        }
        
        if (input.innerText.length > 30) {
            this.resetInputElement(input);
            let errorDisplay = document.querySelector('.result-display-text');
            errorDisplay.innerText = "don't do that!";
            setTimeout(this.clearResult, 1250);
        }
    }

    changeKeyColor(letter) {
        let container = document.querySelector(`.${letter}-container`);
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

        // set TimeOut for shading button

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

        let text = score > 1 ? `${score} points!` : `${score} point!`;
        if (this.grid.pangrams.includes(word)) text += " pangram!";
        
        let resultDisplay = document.querySelector('.result-display-text');
        resultDisplay.innerText = text;

        this.updateScoreBar();

        let scoreDisplay = document.querySelector("#score");
        scoreDisplay.innerText = this.score;
    }

    updateScoreBar() {
        let maxScore = this.grid.maxScore;
        let scorePercentage = this.score / maxScore;
        let scorePercentageAdj = scorePercentage / 0.6 * 100;
        
        let scoreBar = document.querySelector('.score-bar-graph');

        scoreBar.style.width = scorePercentageAdj + "%";
    }
    
    calculateLevel() {

        let maxScore = this.grid.maxScore;
        
        let scorePercentage = this.score / maxScore;
        
        let level;
        
        if (scorePercentage < 0.05) {
            level = "Getting Started";
        }else if (scorePercentage < 0.20) {
            level = "Good";
        }else if (scorePercentage < 0.30) {
            level = "Impressive";
        }else if (scorePercentage < 0.40) {
            level = "Great";
        }else if (scorePercentage < 0.50) {
            level = "Amazing";
        }else if (scorePercentage < 0.60) {
            level = "Polymath";
        }else {
            level = "Savant";
        }
        
        this.level = level;

        this.updateLevelDisplay();
    }

    updateLevelDisplay() {
        let level = document.getElementById('level');
        level.innerText = this.level;
    }
    
    shuffleLetters () {
        let lettersArr = this.grid.lettersArr;
        let middleIdx = Math.floor(lettersArr.length / 2);

        lettersArr = lettersArr.slice(0, middleIdx).concat(lettersArr.slice(middleIdx + 1));
        lettersArr = ShapeUtil.shuffleArray(lettersArr);
        lettersArr.splice(middleIdx, 0, this.grid.keyLetter);
        
        return lettersArr;
    }

    renderLetters(letters) {

        letters.forEach(letter => {
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
        this.clearSubmittedWords();
        this.clearPolygons();
        this.removeSubmitButton();
        this.clearScore();
    }
    
    clearSubmittedWords() {        
        let words = this.wordDisplayList.children;
        while (words.length > 0) {
            words[0].remove();
        }
    }
    
    removeSubmitButton() {
        const submitButton = document.querySelector('.submit');
        if (submitButton !== null) submitButton.remove();
    }
    
    clearScore() {  
        let points = document.getElementById('score');
        points.innerText = 0;

        let scoreBar = document.querySelector('.score-bar-graph');
        scoreBar.style.width = "1%";
    }
    
    clearPolygons() {
        
        let svgs = document.querySelector('.polygon-container').children;
        while (svgs.length > 0) {
            svgs[0].remove();
        }
    }



}

export { Game };