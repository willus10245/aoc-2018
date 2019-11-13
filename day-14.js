const string = "37";
let recipeList = string.split("").map(Number);
let firstElf = 0;
let secondElf = 1;
const sequenceToFind = "554401";
// const sequenceToFind = "59414";
const { length: sequenceLength } = sequenceToFind;

function getIsSequenceAbsent() {
  return (
    recipeList
      .slice(-7)
      .map(num => num.toString())
      .join("")
      .indexOf(sequenceToFind) == -1
  );
}

while (getIsSequenceAbsent()) {
  if (recipeList.length % 1000 == 0) {
    console.log(recipeList.length);
  }
  // sum current recipes
  const recipeScoreSum = recipeList[firstElf] + recipeList[secondElf];
  // add sum digits to end of recipe list
  if (recipeScoreSum < 10) {
    nextRecipes = recipeList.concat(recipeScoreSum);
  } else {
    nextRecipes = recipeList.concat(
      recipeScoreSum
        .toString()
        .split("")
        .map(Number)
    );
  }
  // move first elf
  const firstMoveAmount = 1 + nextRecipes[firstElf];
  const nextFirstElf = (firstElf + firstMoveAmount) % nextRecipes.length;
  nextFirstElf;
  // move second elf
  const secondMoveAmount = 1 + nextRecipes[secondElf];
  const nextSecondElf = (secondElf + secondMoveAmount) % nextRecipes.length;
  nextSecondElf;

  recipeList = nextRecipes;
  firstElf = nextFirstElf;
  secondElf = nextSecondElf;
}

// console.log(
//   Number(
//     recipeList
//       .slice(getTheOnesAfter)
//       .map(num => num.toString())
//       .join("")
//   )
// );

console.log(
  recipeList
    .map(num => num.toString())
    .join("")
    .indexOf(sequenceToFind)
);
