/***
 * search (grid, wordlist)
 * This function accepts a grid (a 2d array of letters)
 * and a wordlist (an array of words to search for). The function finds any words
 * that exist in the word search in any of the 8 possible directions (up, down, left, right
 * and all 4 diagonal directions). This function is case-insensitive in its matching.
 *
 * Returns: an array of words that can be found in the word search
 ***/
module.exports = function search(grid, wordlist) {
  //this will be final answer
  let words_in_grid = [];
  //way to track duplicates
  let path_hash = {};
  //set up dictionary which stores every word under the first letter
  let word_dictionary = {};
  for (let i of wordlist) {
    !word_dictionary[i[0]]
      ? (word_dictionary[i[0]] = [i])
      : (word_dictionary[i[0]] = [...word_dictionary[i[0]], i]);
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      //iterate through grid, check each letter if letter is in dict
      let letter = grid[row][col].toLowerCase();
      if (word_dictionary[letter]) {
        //if in dictionary, take possible words from dictionary and check them.
        let possible_words = word_dictionary[letter];
        //now search through grid at the coordinate of the first letter, compare surrounding letters
        //  with words in possible words
        search_possible_words(row, col, possible_words, grid);
      }
    }
  }
  return words_in_grid;

  //helper functions
  function check_valid_word(row, col, word, path) {
    //we already know the first letter is valid.
    //start with the second.
    let letter = word[1];
    let colLength = grid[0].length;
    let rowLength = grid.length;
    //check all eight cells around first coordinage
    for (let vert = -1; vert < 2; vert++) {
      for (let horz = -1; horz < 2; horz++) {
        //skip if outside grid area
        if (horz + col < 0 || horz + col > colLength - 1) continue;
        if (vert + row < 0 || vert + row > rowLength - 1) continue;
        if (grid[vert + row][horz + col].toLowerCase() === letter) {
          path.push([vert + row, horz + col]);
          // if second letter found
          // follow path all the way down, sort of a dfs
          let newRow = vert + row;
          let newCol = horz + col;
          for (let i = 2; i < word.length; i++) {
            if (horz + newCol < 0 || horz + newCol > colLength - 1) {
              break;
            }
            if (vert + newRow < 0 || vert + newRow > rowLength - 1) {
              break;
            }
            //if third letter found, either add word to list, or continue to next lettter
            if (word[i] === grid[newRow + vert][newCol + horz].toLowerCase()) {
              path.push([vert + row, horz + col]);
              if (i === word.length - 1) {
                //make sure no duplicate paths/words are found.
                if (path_hash[path]) {
                  break;
                } else {
                  path_hash[path] = true;
                  words_in_grid.push(word);
                }
              } else {
                newRow = newRow + vert;
                newCol = newCol + horz;
              }
            }
          }
        }
      }
    }
  }

  function search_possible_words(row, col, words) {
    //look at each word individually
    for (let word of words) {
      //if word is valid, return true and push to answer array
      if (check_valid_word(row, col, word, [[row, col]])) {
        words_in_grid.push(word);
      }
    }
  }
};
