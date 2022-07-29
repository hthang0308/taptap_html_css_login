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

// 4. Print a nice output to the console, saying who has the higher BMI. The message
// is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
// 5. Use a template literal to include the BMI values in the outputs. Example: "Mark's
// BMI (28.3) is higher than John's (23.9)!"

//step 4
if (markHigherBMI) {
  console.log("Mark's BMI is higher than John's!");
} else {
  console.log("John's BMI is higher than Mark's!");
}
//step 5
//round the BMI values to 2 decimal places
if (markHigherBMI) {
  console.log(`Mark's BMI (${markBMI.toFixed(2)}) is higher than John's (${johnBMI.toFixed(2)})!`);
} else {
  console.log(`John's BMI (${johnBMI.toFixed(2)}) is higher than Mark's (${markBMI.toFixed(2)})!`);
}
