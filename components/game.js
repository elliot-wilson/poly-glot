import { Grid } from './grid.js';
import { ShapeUtil } from './shape_util.js';
import { registerMouseDown, registerMouseUp } from '../components/mouse_util';

class Game {
    
    constructor (size = 7) {

        this.score = 0;
        this.wordDisplayList = document.querySelector(".word-display-list");
        
        this.clearGame();
        
        this.grid = new Grid ();
        this.level = this.calculateLevel();
        this.words = [];
        
        this.renderLetters(this.grid.lettersArr);
        this.spinBoard();
        this.bindEvents();
        this.clearModal();
        
        registerMouseDown();
        registerMouseUp();
        
    }
    
    bindEvents () {
        this.registerClick();
        this.activateSubmitButton();
        this.registerDelete();
        this.registerScramble();
        this.activateRevealWords();
    }

    activateRevealWords() {
        let answerModal = document.getElementById('answer-modal');
        let button = this.createRevealButton();
        let closer = document.getElementById('modal-word-close');

        button.addEventListener('click', (event) => {
            answerModal.style.display = "block";
            this.displayWordsModal();
        });

        closer.addEventListener('click', (event) => {
            answerModal.style.display = "none";
        });

        window.addEventListener('click', (event) => {
            if (event.target === answerModal) {
                answerModal.style.display = "none";
            }
        });

    }

    createRevealButton() {
        let revealButton = document.createElement('div');
        revealButton.classList.add('button', 'reveal-answers');
        revealButton.innerText = "Reveal Words";

        let toplineElements = document.querySelector('.topline-elements');
        let modal = document.getElementById('answer-modal');

        toplineElements.insertBefore(revealButton, modal);

        return revealButton;
    }

    displayWordsModal () {
        let wordListModal = document.getElementById('modal-word-list');

        if (wordListModal.childElementCount === 0) {
            this.grid.wordbank.forEach(word => {
                let newWord = document.createElement('li');
                newWord.innerText = word;
                wordListModal.appendChild(newWord);
            });
        }

        if (wordListModal.children.length > 196) {
            document.documentElement.style.setProperty('--modal-word-list-font-size', '15px');
            document.documentElement.style.setProperty('--modal-word-list-word-length', '80px');
        }
    }

    activateSubmitButton() {
        let submitButton = document.createElement('div');
        submitButton.classList.add('submit', 'button');
        submitButton.innerText = "Enter";
        
        let buttonDiv = document.querySelector('.buttons-div');
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
            this.spinBoard();
            this.registerClick();
            registerMouseDown();
            registerMouseUp();
        });
    }

    spinBoard() {
        let divs = Array.from(document.querySelector('.polygon-container').children);

        divs.forEach(div => {
            let svg = div.children[0];
            svg.classList.add("clicked-letter");
            svg.style.transform = "scale(0.85)";
            setTimeout(() => {
                svg.classList.remove("clicked-letter");
                svg.style.transform = "scale(1)";
            }, 75);
        })
    }

    registerClick() {
        let svgs = Array.from(document.querySelector('.polygon-container').children);

        svgs.forEach(svg => {
            svg.addEventListener("click", event => {
                let letter = event.currentTarget.children[0].children[1].innerHTML;
                this.processLetter(letter);
            });
        });
    }

    processKeyLogEvent(event) {
        let letter = event.key;
        this.processLetter(letter, event);
    }
    
    processLetter(letter, fromKeyLog) {
        let input = document.querySelector('#guessed-word');
        let alphabet = "abcdefghijklmnopqrstuvwxyz";

        
        if (input.classList.contains("blank")) {
            input.innerText = "";
            input.classList.remove("blank");
        }

        if (fromKeyLog) {
            if (this.grid.lettersArr.includes(letter)){
                this.changeKeyColorAndSize(letter);
            }

            if (letter === "Enter"){
                let submitButton = document.querySelector('.submit');
                this.submitWord();
                this.pressButton(submitButton);
            } else if (letter === "Backspace") {
                let deleteButton = document.querySelector('.delete');
                this.pressButton(deleteButton);
                input.innerText = input.innerText.slice(0, input.innerText.length - 1);
            }
        }

        if (alphabet.includes(letter)) {
            input.innerText += letter;
        }

        if (input.innerText.length === 0) {
            this.resetInputElement(input);
        }
        
        if (input.innerText.length > 20) {
            this.resetInputElement(input);
            let errorDisplay = document.querySelector('.result-display-text');
            errorDisplay.innerText = "don't do that!";
            setTimeout(this.clearResult, 1500);
        }
    }

    pressButton(button) {
        button.classList.add('clicked-button');
        this.spinBoard();
        setTimeout(() => {
            button.classList.remove('clicked-button');
        }, 175);
    }

    changeKeyColorAndSize(letter) {
        let container = document.querySelector(`.${letter}-container`);
        container.classList.add("clicked-letter");
        container.style.transform = "scale(0.85)";
        setTimeout(() => {
            container.classList.remove("clicked-letter");
            container.style.transform = "scale(1)";
        }, 150);
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
        let scorePercentageAdj = Math.min(scorePercentage / 0.6 * 100, 100);
        
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
        this.updateWordCountDisplay();
        let wordElement = document.createElement("li");
        wordElement.innerText = word;
        this.wordDisplayList.appendChild(wordElement);
        this.adjustWordDisplay();
    }

    updateWordCountDisplay() {
        document.getElementById('word-count').innerText = this.words.length;
        let pluralizer = document.getElementById('word-count-pluralizer');
        if (this.words.length === 1) {
            pluralizer.innerText = "";
        } else {
            pluralizer.innerText = "s";
        }
    }

    adjustWordDisplay() {

        if (this.words.length > 90){
            this.wordDisplayList.setAttribute("style", "font-size: 12.5px");
        } else if (this.words.length > 105 ){
            this.wordDisplayList.setAttribute("style", "font-size: 8px");
            document.documentElement.style.setProperty('--word-display-list-word-length', '55px');
        }
    }
    
    clearGame() {
        this.clearSubmittedWords();
        this.clearPolygons();
        this.removeSubmitButton();
        this.clearScore();
        this.clearReveal();
    }
    
    clearSubmittedWords() {        
        let words = this.wordDisplayList.children;
        while (words.length > 0) {
            words[0].remove();
        }
        this.words = [];
        this.updateWordCountDisplay();
    }
    
    clearPolygons() {
        let svgs = document.querySelector('.polygon-container').children;
        while (svgs.length > 0) {
            svgs[0].remove();
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

    clearModal() {
        let loadingModal = document.getElementById('loading-modal');
        loadingModal.style.display = "none";
    }

    clearReveal() {
        const revealButton = document.querySelector('.reveal-answers');
        if (revealButton !== null) revealButton.remove();

        const revealedWords = document.getElementById('modal-word-list').children
        while (revealedWords.length > 0) {
            revealedWords[0].remove();
        }
    }
    

}

export { Game };