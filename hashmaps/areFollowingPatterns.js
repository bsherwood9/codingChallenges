//My answer - woooooof
function areFollowingPatterns(strings, patterns) {
  let str_set = new Set(strings);
  let pattern_set = new Set(patterns);
  if (str_set.size !== pattern_set.size) {
    return false;
  }

  let str_hash = {};
  let patt_hash = {};
  for (var i = 0; i < strings.length; i++) {
    if (patt_hash[patterns[i]]) {
      continue;
    } else {
      patt_hash[patterns[i]] = i;
    }
    if (str_hash[strings[i]]) {
      continue;
    } else {
      str_hash[strings[i]] = i;
    }
  }

  for (var i = 0; i < strings.length; i++) {
    if (patt_hash[patterns[i]] == str_hash[strings[i]]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}
//we want to compare strings to patters
//if patterns and strings are all different, return false
//if they follow same pattern return true.

//top answer on codesignal
function areFollowingPatterns(strings, patterns) {
  var hash = {},
    reverse = {};
  return strings.every((s, i) => {
    var p = patterns[i];
    if (!hash[p]) hash[p] = s;
    if (!reverse[s]) reverse[s] = p;
    return s == hash[p] && reverse[s] == p;
  });
}

function areFollowingPatterns(strings, patterns) {
  for (var i = 0; i < strings.length; i++) {
    if (patterns.indexOf(patterns[i]) != strings.indexOf(strings[i]))
      return false;
  }
  return true;
}
