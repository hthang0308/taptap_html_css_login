// Given a string s, find the length of the longest substring without repeating characters.
const lengthOfLongestSubstring = function (s) {
  let slidingWindow = "";
  let maxLength = 0;
  for (let i = 0; i < s.length; i++) {
    if (slidingWindow.includes(s[i])) {
      slidingWindow = slidingWindow.slice(slidingWindow.indexOf(s[i]) + 1);
    }
    slidingWindow += s[i];
    maxLength = Math.max(maxLength, slidingWindow.length);
  }
  return maxLength;
};
let s = "pwwkew";
console.log(lengthOfLongestSubstring(s));
