const Dictionary = require('./full_dictionary.js');

const lettersSize = 7;

const vowels = "aeiou";
const alphabet = "abcdefghijklmnopqrstuvwxyz";

function randomCharFromString (string) {
    return string[Math.floor(Math.random() * string.length)];
}

function isPangram(word, lettersArr) {

    let wordLetters = word.split('');

    if (!lettersArr.every(letter => wordLetters.includes(letter))) return false;
    if (!wordLetters.every(letter => lettersArr.includes(letter))) return false;

    return true;
}

let lettersArr;
let pangram = false;

while (!pangram) {

    lettersArr = [];
    wordbank = [];

    // can probably be segmented off as function
    lettersArr.push(randomCharFromString(vowels));

    while (lettersArr.length < lettersSize) {
        let letter = randomCharFromString(alphabet);
        if (!lettersArr.includes(letter)) lettersArr.push(letter);
    }
    // ^^^

    let regex = new RegExp (`^[${lettersArr.join('')}]+$`);
    
    Object.keys(Dictionary).forEach(key => {

        if (regex.test(key)) wordbank.push(key);
        
        if (isPangram(key, lettersArr)) pangram = key;
        
    });
    
}

console.log(lettersArr);
console.log(pangram);
console.log(wordbank);