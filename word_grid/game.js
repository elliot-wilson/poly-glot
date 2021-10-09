import { Grid } from './grid.js';

class Game {
    
    constructor () {

        
        this.wordDisplayList = document.querySelector(".word-display-list");
        this.lettersDisplay = document.querySelector('.letter-list');
        
        this.clearGame();
        
        this.grid = new Grid ();
        
        
        this.renderletters();
        this.bindEvents();
    }

    bindEvents() {
        const submitButton = document.querySelector('#word-guess-form');
        console.log("hello");
        console.log(this);
        submitButton.addEventListener("submit", wordcheck(e))
        
        function wordcheck (e) {
            submitButton.classList.add("evented");
            e.preventDefault();
            console.log("heyyyy");
            console.log(this);
            let word = document.querySelector('#guessed-word');
            if (this.grid.wordbank.includes(word.value)) {
                this.addWord(word.value);
            }

            word.value = "";
        };
    }

    renderletters() {

        const canvas = document.querySelector('#canvas');
        const ctx = canvas.getContext('2d');


        this.grid.lettersArr.forEach(letter => {
            let letterDisplay = document.createElement("li");
            letterDisplay.innerText = letter;
            if (letter === this.grid.keyLetter) {
                letterDisplay.innerText += "   <--- key letter";
            }
            this.lettersDisplay.appendChild(letterDisplay);
            drawHexagon(50, 50, letter);
        });

        function drawHexagon(x, y, letter) {
            const a = 2 * Math.PI / 6;
            const r = 30;
            ctx.beginPath();
            for (var i = 0; i < 6; i++) {
                ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
            }
            ctx.closePath();
            ctx.stroke();
            ctx.font = "20px Georgia";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(letter, x, y);
        }

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

        const submitButton = document.querySelector('#word-guess-form');

        if (submitButton.classList.contains("evented")) {
            submitButton.removeEventListener("submit", wordCheck);
        }
    }



}

export { Game };