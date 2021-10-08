const Dictionary = require('../word_grid/full_dictionary.js');

function vowels() {
    return "aeiou";
}

function alphabet() {
    return "abcdefghijklmnopqrstuvqxyz";
}

function randomCharFromString(string) {
    return string[Math.floor(Math.random() * string.length)];
}

function generateLettersArr(letterSize) {

    let lettersArr = [];

    lettersArr.push(randomCharFromString(vowels()));

    while (lettersArr.length < letterSize) {
        let letter = randomCharFromString(alphabet());
        if (!lettersArr.includes(letter)) lettersArr.push(letter);
    }

    return lettersArr;

}

function isPangram(word, lettersArr) {
    let wordLetters = word.split('');

    if (!lettersArr.every(letter => wordLetters.includes(letter))) return false;
    if (!wordLetters.every(letter => lettersArr.includes(letter))) return false;

    return true;
}

function generateValidLettersArr () {

    let lettersArr;
    let keyLetter;
    let wordbank;
    let regex;
    let pangram = false;
    
    while (!pangram) {
        
        lettersArr = generateLettersArr(7);
        keyLetter = lettersArr[Math.floor(lettersArr.length / 2)];
        wordbank = [];
        regex = new RegExp (`^[${lettersArr.join('')}]+$`);
        
        Object.keys(Dictionary).forEach(word => {
            if (regex.test(word) && word.includes(keyLetter)) wordbank.push(word);
            if (isPangram(word, lettersArr)) pangram = word;
        });

    }

    return {pangram: pangram, lettersArr: lettersArr, wordbank: wordbank, keyLetter: keyLetter};
}

console.log(generateValidLettersArr());