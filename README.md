# Poly-Glot: A Vanilla JavaScript Word Game

I love the New York Times' Spelling Bee game (https://www.nytimes.com/puzzles/spelling-bee). There's just one problem: they only release one puzzle per day! How am I supposed to procrastinate without an infinite supply of word puzzles?

To solve this issue, I decided to build Poly-Glot, a simple JavaScript application that generates new Spelling Bee-style puzzles algorithmically. Along the way, I became much more comfortable with Vanilla JavaScript and Object Oriented Programming, and I got to learn a little bit about dictionary design, too.

# [Live Site](https://elliot-wilson.github.io/poly-glot/)

<a href="https://elliot-wilson.github.io/poly-glot/" target="_blank" rel="noreferrer noopener"><img src="https://portfolio-ew.s3.us-east-1.amazonaws.com/poly-glot-homepage.png" /></a>

# Technologies

* Vanilla JavaScript
    * no jQuery, no React, no nothin'!

* Webpack
    * JavaScript application bundler

* Babel
    * JavaScript transpiler that improves browser compatibility

* HTML5 / CSS3 / SCSS
    * Standard tools for markup and styling

# Features

## A Spelling Bee Algorithm

* I use a fairly straightword algorithm to generate valid spelling bee puzzles. I generate a string of 7 unique letters that contains at least one vowel, and then I scan my dictionary to check whether this letter combination results in a pangram (a word that contains all 7 letters).

````javascript
//grid.js
    isPangram (word, lettersArr) {
        let wordLetters = word.split('');

        if (!lettersArr.every(letter => wordLetters.includes(letter))) return false;
        if (!wordLetters.every(letter => lettersArr.includes(letter))) return false;

        return true;
    }

    generateValidLettersArr (size) {

        let lettersArr;
        let keyLetter;
        let wordbank;
        let regex;
        let pangrams = [];

        let boundPangram = this.isPangram.bind(this);
        
        while (pangrams.length === 0) {
            
            lettersArr = this.generateLettersArr(size);
            keyLetter = lettersArr[Math.floor(lettersArr.length / 2)];
            wordbank = [];
            regex = new RegExp (`^[${lettersArr.join('')}]+$`);
            
            Object.keys(Dictionary).forEach(word => {
                if (regex.test(word) && word.includes(keyLetter)) wordbank.push(word);
                if (word.length >= 7 && boundPangram(word, lettersArr)) pangrams.push(word);
            });

        }

        return { pangrams, lettersArr, wordbank, keyLetter };
    }
````
This is not a fast process, but I took a few steps to make it more bearable:

### A Pre-Processed Dictionary

* I started with a <a href="http://www.gwicks.net/dictionaries.htm" target="_blank">dictionary</a> of American English capped at 77,000 words. Larger dictionaries &mdash; such as the Scrabble dictionary, with around 279,000 words &mdash; took way too long to scan.
* I pre-processed this dictionary to remove all words with < 4 letters, as well as words that had more than 9 unique letters. (Since you're limited to the letters in the honeycomb, words with too many different letters cannot ever be valid. I could have set my limit at 7 unique letters, but I wanted my game to be able to grow. See below!)

### Algorithmic Shortcuts
* My `generateLettersArr` function begins every letter-sequence with a vowel. This eliminates obviously bad sequences like `zxqrtvw`.
* I arbitrarily choose the middle letter of the sequence as the central "key" letter. I suppose I could have written an algorithm that rotated through each letter of the sequence randomly to see whether selecting THAT letter as the key letter permitted a sufficient number of valid words, but I'm willing to wager that the vast majority of sequences that have valid pangrams will also have plenty of valid words no matter which letter is the key letter. Why make extra work for myself?
* I only perform my pangram check if the dictionary word has 7 letters or more.

## Interactive Gameplay

* The fun of playing Spelling Bee, er, Poly-Glot, isn't just the algorithm! It's the visuals! I used Event Listeners to modify the color and size of the polygons whenever they are clicked or their letter is typed.

<img src="https://portfolio-ew.s3.us-east-1.amazonaws.com/sample_gif.gif">

* The polygons also jiggle when you scramble their order or start a new game.

* A scorebar keeps track of your progress, which corresponds to the level display above the wordbank.

* And look! Modals!

<img src="https://portfolio-ew.s3.us-east-1.amazonaws.com/modals.gif">

## Object Oriented Programming

* My application adheres to the classic design principles of Object Oriented Programming. I separated my concerns into a main file (`index.js`), a class that controls each Game (`game.js`), and a class that controls each Grid (`grid.js` &mdash; the letter array used by each game).

* Where it made sense, I also built out util files for specific sub-problems. For example, the function that draws a hexagon did not need to clutter up the Grid class file.

````javascript
//game.js
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
````

# Challenges

## Generating New Games

* The most finnicky part of building this game was designing the logic that allowed for a game to be cleared and replaced by a new game. The core of the problem was that the callbacks for Event Listeners need a "snapshot" of the current gameboard whenever they're created, whether that's from a bound function or an arrow function whose scope includes the gameboard. This "snapshot" gets out of date when you create a new game, so you need to remove old Event Listener if you don't want weirdness to ensue &mdash; for example, the ability to get points for entering words from the PREVIOUS game. Often, the easiest solution to this problem was simply to delete and rebuild game-dependant HTML elements at every refresh.

# What's next?

* My next step is to make gameplay customizable. For example, I would like to let players choose whether they want a puzzle with lots of different words (call it a GARRULOUS puzzle, say) or very few (LACONIC). I would also like to let players choose the number of letters in the puzzle &mdash; and hence the shapes of the polygons and the point values of the pangrams. What would Spelling Bee look like with a septagon?