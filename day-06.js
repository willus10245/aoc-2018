const input = `267, 196
76, 184
231, 301
241, 76
84, 210
186, 243
251, 316
265, 129
142, 124
107, 134
265, 191
216, 226
67, 188
256, 211
317, 166
110, 41
347, 332
129, 91
217, 327
104, 57
332, 171
257, 287
230, 105
131, 209
110, 282
263, 146
113, 217
193, 149
280, 71
357, 160
356, 43
321, 123
272, 70
171, 49
288, 196
156, 139
268, 163
188, 141
156, 182
199, 242
330, 47
89, 292
351, 329
292, 353
290, 158
167, 116
268, 235
124, 139
116, 119
142, 259`
  .split('\n')
  .map(line => line.split(', ').map(Number))

const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const anchors = input.reduce((acc, curr, i) => ({
  ...acc,
  [labels[i]]: {
    x: curr[0],
    y: curr[1]
  }
}), {})

console.log(anchors)

const grid = Array(400).fill(Array(400).fill(null)) // make a 400 x 400 grid
  .map((arr, currY) => arr.map((_, currX) => {      // and fill it by labelling each point with the anchor that it is closest to.
    const iterableAnchors = Object.entries(anchors)
    const distances = iterableAnchors.map(([label, anchorCoords]) => {
      const distance = Math.abs(anchorCoords.x - currX) + Math.abs(anchorCoords.y - currY)
      return [label, distance]
    })
    // console.log(distances)
    const minimumDistance = distances.reduce((acc, curr) => acc < curr[1] ? acc : curr[1], 800)
    // console.log(minimumDistance)
    const closest = distances.filter(distance => distance[1] === minimumDistance)
    if (closest.length === 1) {
      return closest[0][0]
    } else {
      return '.'
    }
  }))

const top = grid[0]
const bottom = grid[399]
const left = grid.map(row => row[0])
const right = grid.map(row => row[399])

const touchesPerimeter = label => top.includes(label) || bottom.includes(label) || left.includes(label) || right.includes(label)

// I assume that any area that touches the outer boundary of the rectangle will be infinite
const finites = Object.keys(anchors).filter(label => !touchesPerimeter(label))

console.log(finites)

const countArea = (label, thisGrid) => thisGrid.reduce((acc, row) => {
  const rowCount = row.filter(letter => letter === label).length
  acc += rowCount
  return acc
}, 0)

const finiteAreas = finites.reduce((acc, label) => ({
  ...acc,
  [label]: countArea(label, grid)
}), {})

console.log(finiteAreas)

const largestArea = Math.max(...Object.values(finiteAreas))

console.log(largestArea)

const safeGrid = Array(400).fill(Array(400).fill(null))
  .map((arr, currY) => arr.map((_, currX) => {
    const iterableAnchors = Object.entries(anchors)
    const distances = iterableAnchors.map(([_, anchorCoords]) => {
      const distance = Math.abs(anchorCoords.x - currX) + Math.abs(anchorCoords.y - currY)
      return distance
    })
    const distanceSum = distances.reduce((acc, curr) => acc + curr, 0)
    return distanceSum < 10000 ? 'X' : '.'
  }))

const safeArea = countArea('X', safeGrid)

console.log(safeArea)

const fs = require('fs')
fs.writeFileSync('day-06-grid.txt', '')
fs.writeFileSync('day-06-safe-grid.txt', '')

const lines = grid.map(line => line.join('').concat('\n'))
const safeLines = safeGrid.map(line => line.join('').concat('\n'))

// for (coord of input) {
//   const [x, y] = coord
//   lines[y] = lines[y]
//     .split('')
//     .map((char, i) => {
//       if (i === x) return 'X'
//       return char
//     })
//     .join('')
//     // console.log([lines[x]])
// }

// console.log(lines[142])

for (let i = 0; i < lines.length; i++) {
  fs.appendFileSync('day-06-grid.txt', lines[i])
}

for (let i = 0; i < safeLines.length; i++) {
  fs.appendFileSync('day-06-safe-grid.txt', safeLines[i])
}