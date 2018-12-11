const gridTemplate = Array(300).fill(Array(300).fill(null));

let powerLevelGrid = [];

for (let y = 0; y < gridTemplate.length; y++) {
  powerLevelGrid[y] = gridTemplate[y].map((_, x) => {
    const rackId = x + 10;
    let powerLevel = (rackId * y + 2866) * rackId;
    powerLevel = powerLevel >= 100 ? Number(`${powerLevel}`.split('').reverse()[2]) - 5 : -5;
    return powerLevel;
  });
}

let solutionGrid = [];

for (let y = 0; y < gridTemplate.length - 4; y++) {
  solutionGrid[y] = powerLevelGrid[y].map((val, x) => {
    let sum = 0;
    if (x < powerLevelGrid[y].length - 2) {
      sum = val + powerLevelGrid[y][x+1] + powerLevelGrid[y][x+2]
        + powerLevelGrid[y+1][x] + powerLevelGrid[y+1][x+1] + powerLevelGrid[y+1][x+2]
        + powerLevelGrid[y+2][x] + powerLevelGrid[y+2][x+1] + powerLevelGrid[y+2][x+2];
    }
    if (sum === 30) console.log(`${x}, ${y}`, sum);
    return sum;
  });
}

const maxes = solutionGrid.map(line => Math.max(...line));

console.log(Math.max(...maxes));

const objectGrid = powerLevelGrid.reduce((acc, val, i) => ({
  ...acc,
  [i]: [...val]
}), {});

function sumSquares(grid, squareSize) {
  let sums = {};
  for (let y = 0; y < Object.keys(grid).length - squareSize; y++) {
    sums[y] = [];
    for (let x = 0; x < grid[y].length - squareSize; x++) {
      let sum = 0;
      for (let i = y; i < y + squareSize; i++) {
        for (let j = x; j < x + squareSize; j++) {
          sum += grid[i][j];
        }
      }
      sums[y][x] = sum;
    }
  }
  return sums;
}

function findMaxSumCoords(sumsObject) {
  const maxesObj = Object.entries(sumsObject).reduce((acc, val) => {
    const [key, array] = val;
    acc[key] = Math.max(...array);
    return acc;
  }, {});


  const [entry] = Object.entries(maxesObj).filter(([_, val]) => val === Math.max(...Object.values(maxesObj)));
  const [maxY, maxPower] = entry;
  const maxX = sumsObject[maxY].indexOf(maxPower);

  return {
    maxX,
    maxY: Number(maxY),
    maxPower
  };
}

function findBestPower() {
  const maxes = {};
  for (let squareSize = 1; squareSize <= 30; squareSize++) {
    const maxObj = findMaxSumCoords(sumSquares(powerLevelGrid, squareSize));
    maxes[squareSize] = maxObj;
    console.log(maxObj);
  }
  return maxes;
}

console.log(findBestPower());
