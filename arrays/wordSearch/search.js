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
  //set up dictionary which stores every words under the first letter
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
        //if in dictionary, add words to possible list
        let possible_words = word_dictionary[letter];
        //now search through grid with those words
        search_possible_words(row, col, possible_words, grid);
      }
    }
  }
  return words_in_grid;

  //helper functions
  function check_valid_word(x, y, word, path) {
    //base case, if word has no length, word is valid
    if (!word.length) {
      //check if path to word already exists, if so, it is not valid.
      if (path_hash[path]) {
        return false;
      } else {
        //if it path doesn't exist, return true and add to path dict
        path_hash[path] = true;
        return true;
      }
    }
    let letter = word[0];
    let colLength = grid[0].length;
    let rowLength = grid.length;
    for (let h = -1; h < 2; h++) {
      for (let v = -1; v < 2; v++) {
        if (h + x < 0 || h + x > colLength - 1) continue;
        if (v + y < 0 || v + y > rowLength - 1) continue;
        if (grid[x + h][y + v].toLowerCase() === letter) {
          path.push([x + h, y + v]);
          //found the second letter
          //now do the whole process again
          return check_valid_word(x + h, y + v, word.slice(1), path);
        }
      }
    }
  }

  function search_possible_words(row, col, words) {
    //look at each word individually
    for (let word of words) {
      //if word is valid, return true and push to answer array
      if (check_valid_word(row, col, word.slice(1), [])) {
        words_in_grid.push(word);
      }
    }
  }
};
