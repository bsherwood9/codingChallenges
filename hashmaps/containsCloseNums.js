// description
// Given an array of integers nums and an integer k, determine whether there are two distinct indices i and j in the array where nums[i] = nums[j] and the absolute difference between i and j is less than or equal to k.

// Example

// For nums = [0, 1, 2, 3, 5, 2] and k = 3, the output should be
// containsCloseNums(nums, k) = true.

// There are two 2s in nums, and the absolute difference between their positions is exactly 3.

// For nums = [0, 1, 2, 3, 5, 2] and k = 2, the output should be
// containsCloseNums(nums, k) = false.

// The absolute difference between the positions of the two 2s is 3, which is more than k.

//My answer
function containsCloseNums(nums, k) {
  let counting = {};
  let answer = false;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] in counting) {
      let diff = Math.abs(counting[nums[i]] - i);
      counting[nums[i]] = i;
      if (diff <= k) {
        answer = true;
      }
    } else {
      counting[nums[i]] = i;
    }
  }
  return answer;
}

//top rated answer in js
function containsCloseNums(nums, k) {
  var indexes = {};

  for (i = 0; i < nums.length; i++) {
    if (i - indexes[nums[i]] <= k) return true;
    indexes[nums[i]] = i;
  }

  return false;
}
