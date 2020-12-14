"use strict";
module.exports = compare;

function compare(word, guess) {
    let common = 0;
    guess = guess.toUpperCase();
    word = word.toUpperCase();
    let wordMap = createCountMap(word);
    guess.split("").forEach((chr) => {
        if (wordMap[chr]) {
            wordMap[chr]--;
            common++;
            if (wordMap[chr] == 0) delete wordMap[chr];
        }
    });
    return common;
}

// create a char count map to save the characters and their count
function createCountMap(word) {
    let charToCount = {};
    word.split("").forEach((chr) => {
        charToCount[chr] ? charToCount[chr]++ : (charToCount[chr] = 1);
    });
    return charToCount;
}
