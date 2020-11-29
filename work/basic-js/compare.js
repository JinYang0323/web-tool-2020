'use strict';
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {
  // DO NOT MODIFY

  /* YOU MAY MODIFY THE LINES BELOW */
  let count = 0;
  guess = guess.toUpperCase();
  word = word.toUpperCase();
  let wordMap = createCountMap(word);
  guess.split('').forEach((chr) => {
    if (wordMap[chr]) {
      wordMap[chr]--;
      count++;
      if (wordMap[chr] == 0) delete wordMap[chr];
    }
  });
  return count;
}

// create a char count map to save the characters and their count
function createCountMap(word) {
  let map = {};
  word.split('').forEach((chr) => {
    map[chr] ? map[chr]++ : (map[chr] = 1);
  });
  return map;
}
