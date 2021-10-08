const lettersSize = 7;

let lettersArr = [];

const vowels = "aeiou";
const alphabet = "abcdefghijklmnopqrstuvwxyz";

function randomFromString (string) {
    return string[Math.floor(Math.random() * string.length)];
}

lettersArr.push(randomFromString(vowels));

while (lettersArr.length < lettersSize) {
    let letter = randomFromString(alphabet);
    if (!lettersArr.includes(letter)) lettersArr.push(letter);
}
