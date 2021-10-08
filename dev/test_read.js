const fs = require("fs");

const obj = {};

fs.readFile('./dictionary.txt', 'utf8', function (err, data) {
    if (err) throw err;
    let splitted = data.toString().split("\n");
    for (let i = 0; i < splitted.length; i++) {
        if (splitted[i].length > 3) obj[splitted[i]] = true;
    }
});

fs.writeFileSync('./full_dictionary.js', JSON.stringify(obj, null, 2));