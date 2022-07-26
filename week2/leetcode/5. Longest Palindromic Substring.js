function extend(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return s.slice(left + 1, right);
}
var longestPalindrome = function (s) {
  let start = 0;
  let end = 0;
  for (let i = 0; i < s.length; i++) {
    let length1 = extend(s, i, i).length;
    let length2 = extend(s, i, i + 1).length;
    let currentmax = Math.max(length1, length2);
    if (currentmax > end - start) {
      start = i - Math.floor((currentmax - 1) / 2);
      end = i + Math.floor(currentmax / 2);
    }
  }
  return s.slice(start, end + 1);
};
let s = "cbbd";
console.log(longestPalindrome(s));
