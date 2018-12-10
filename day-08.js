const fs = require('fs')
const fileName = process.argv[2]

function buildTree(numOfChildNodes, numOfMetadata, rest) {
  // console.log('start function')
  if (numOfChildNodes === 0) {
    // console.log('in if')
    const metadata = rest.slice(0, numOfMetadata)
    const value = metadata.reduce((acc, curr) => acc + curr, 0)
    // console.log('leaf node value: ', value)
    return [value, rest.slice(numOfMetadata)]
  } else {
    // console.log('in else')
    let childNodesLeft = numOfChildNodes
    let currRest = rest
    let childrensValues = []
    // console.log('start while')
    while (childNodesLeft > 0) {
      // console.log('childNodesLeft: ', childNodesLeft)
      const [first, second, ...newRest] = currRest
      const arr = buildTree(first, second, newRest)
      childrensValues = childrensValues.concat(arr[0])
      currRest = arr[1]
      childNodesLeft--
      // console.log('children nodes values: ', childrensValues)
    }
    // console.log('end while')
    const metadata = currRest.slice(0, numOfMetadata)
    // console.log('metadata: ', metadata)
    currRest = currRest.slice(numOfMetadata)
    const value = metadata.reduce((acc, curr) => {
      if (curr === 0 || !childrensValues[curr - 1]) return acc
      return acc + childrensValues[curr - 1]
    }, 0)
    // console.log('node with children value: ', value)
    return [value, currRest]
  }
}

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) throw err
  const [first, second, ...rest] = data.split(' ').map(Number)
  const valueArray = buildTree(first, second, rest)
  console.log(valueArray[0])
})