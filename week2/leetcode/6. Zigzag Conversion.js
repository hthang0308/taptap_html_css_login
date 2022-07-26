// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

// P   A   H   N
// A P L S I I G
// Y   I   R   D
// And then read line by line: "PAHNAPLSIIGYIR"

// Write the code that will take a string and make this conversion given a number of rows:

// string convert(string s, int numRows);

var convert = function (s, numRows) {
  if (numRows <= 1) return s;
  let arr = [];
  let currentRow = 0;
  let down = true;
  for (let i = 0; i < numRows; i++) {
    arr[i] = "";
  }
  for (let i = 0; i < s.length; i++) {
    if (currentRow === 0) down = true;
    else if (currentRow === numRows - 1) down = false;
    arr[currentRow] += s[i];
    down ? currentRow++ : currentRow--;
  }
  return arr.join("");
};
let s = "PAYPALISHIRING";
let numRows = 3;
console.log(convert(s, numRows));
