// 1. Store Mark's and John's mass and height in variables
// 2. Calculate both their BMIs using the formula (you can even implement both
// versions)
// 3. Create a Boolean variable 'markHigherBMI' containing information about
// whether Mark has a higher BMI than John.

//step 1
const markMass = prompt("Enter Mark's mass in kg");
const markHeight = prompt("Enter Mark's height in m");
const johnMass = prompt("Enter John's mass in kg");
const johnHeight = prompt("Enter John's height in m");
console.log(markMass, markHeight, johnMass, johnHeight);

//step 2
const markBMI = markMass / (markHeight * markHeight);
const johnBMI = johnMass / (johnHeight * johnHeight);
console.log(markBMI, johnBMI);

//step 3
const markHigherBMI = markBMI > johnBMI;
