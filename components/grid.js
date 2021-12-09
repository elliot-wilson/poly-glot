import { Dictionary } from './dictionary.js';

class Grid {
    
    constructor (size = 7) {
        let gridData = this.generateValidLettersArr(size);

        this.lettersArr = gridData.lettersArr;
        this.wordbank = gridData.wordbank;
        this.pangrams = gridData.pangrams;
        this.keyLetter = gridData.keyLetter;
        this.maxScore = this.maxScore(this.wordbank);
    }
    
    vowels () {
        return "aeiou";
    }

    alphabet () {
        return "abcdefghijklmnopqrstuvqxyz";
    }

    randomCharFromString(string) {
        return string[Math.floor(Math.random() * string.length)];
    }

    generateLettersArr (size) {

        let lettersArr = [];

        lettersArr.push(this.randomCharFromString(this.vowels()));

        while (lettersArr.length < size) {
            let letter = this.randomCharFromString(this.alphabet());
            if (!lettersArr.includes(letter)) lettersArr.push(letter);
        }

        return lettersArr;

    }

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
                if (boundPangram(word, lettersArr)) pangrams.push(word);
            });

        }

        return {pangrams: pangrams, lettersArr: lettersArr, wordbank: wordbank, keyLetter: keyLetter};
    }

    maxScore (wordbank) {
        let maxScore = 0;
        wordbank.forEach(word => {
            if (word.length === 4) {
                maxScore += 1;
            } else {
                maxScore += word.length
                if (this.pangrams.includes(word)) maxScore += 16;
            }
        });
        return maxScore;
    }

}

export { Grid };