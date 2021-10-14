const fs = require("fs");

const obj = {};

fs.readFile('./usa2.txt', 'utf8', function (err, data) {
    if (err) throw err;
    let splitted = data.toString().split("\n");
    for (let i = 0; i < splitted.length; i++) {
        let word = splitted[i];
        if (word.length > 3) {
            let count = {};
            for (let i = 0; i < word.length; i++) {
                if (count[word[i]] === undefined) count[word[i]] = 0;
                count[word[i]] += 1;
            }
            if (Object.keys(count).length < 9) {
                obj[splitted[i]] = true;
            }
        }
    }
});

fs.writeFileSync('./best_dictionary.js', JSON.stringify(obj, null, 2));