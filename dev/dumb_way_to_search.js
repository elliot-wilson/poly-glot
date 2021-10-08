function dumbSearch(dictionary, lettersArr) {

    let length = lettersArr.length;
    
    for (word of dictionary) {
        if (word.length < length) {
            continue;
        }

        

    }

    return false;

}

function isPangram(word, lettersArr) {

    let wordLetters = word.split('');

    if (!lettersArr.every(letter => wordLetters.includes(letter))) return false;
    if (!wordLetters.every(letter => lettersArr.includes(letter))) return false;

    return true;
}