// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
var reverse = function (x) {
  let str = x + "";
  //remove the sign
  let isNegative = str[0] === "-";
  if (str[0] === "-") {
    str = str.slice(1);
  }
  //reverse the string
  str = str.split("").reverse().join("");
  //add the sign back
  if (isNegative) {
    str = "-" + str;
  }
  //check if the reversed number is out of range
  const MAX_INT = Math.pow(2, 31) - 1;
  const MIN_INT = -Math.pow(2, 31);
  if (Number(str) > MAX_INT || Number(str) < MIN_INT) {
    return 0;
  }
  return Number(str);
};
console.log(reverse(123));
