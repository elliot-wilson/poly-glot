import { Dictionary } from './full_dictionary';

class Grid {
    
    constructor (size = 7) {
        let gridData = this.generateValidLettersArr(size);
        console.log(gridData);
        this.lettersArr = gridData.lettersArr;
        this.wordbank = gridData.wordbank;
        this.pangram = gridData.pangram;
        this.keyLetter = gridData.keyLetter;
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

    generateLettersArr (letterSize) {

        let lettersArr = [];

        lettersArr.push(this.randomCharFromString(this.vowels()));

        while (lettersArr.length < letterSize) {
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
        let pangram = false;

        let boundPangram = this.isPangram.bind(this);
        
        while (!pangram) {
            console.log("hey");    
            lettersArr = this.generateLettersArr(size);
            keyLetter = lettersArr[Math.floor(lettersArr.length / 2)];
            wordbank = [];
            regex = new RegExp (`^[${lettersArr.join('')}]+$`);
            
            Object.keys(Dictionary).forEach(word => {
                if (regex.test(word) && word.includes(keyLetter)) wordbank.push(word);
                if (boundPangram(word, lettersArr)) pangram = word;
            });

        }

        return {pangram: pangram, lettersArr: lettersArr, wordbank: wordbank, keyLetter: keyLetter};
    }

}

export { Grid };