// 418 players; last marble is worth 71339 points

function makePlayer() {
  return {
    score: 0
  }
}

function placeMarble(currBoard, marbleValue, currentMarbleIndex) {
  let newBoard
  let nextCurrMarble
  switch (board.length) {
    case 1:
    case 3:
      newBoard = currBoard.concat(marbleValue)
      nextCurrMarble = newBoard.length - 1
      break
    case 2:
      newBoard = [...currBoard]
      newBoard.splice(1, 0, marbleValue)
      nextCurrMarble = 1
      break
    default:
      // console.log('new marble value: ', marbleValue)
      // console.log('current marble index: ', currentMarbleIndex)
      // console.log('starting board: ', currBoard)
      newBoard = [...currBoard]
      const nextIndex = currentMarbleIndex + 2
      if (nextIndex <= currBoard.length) {
        newBoard.splice(nextIndex, 0, marbleValue)
        nextCurrMarble = nextIndex
      } else {
        newBoard.splice(nextIndex - currBoard.length, 0, marbleValue)
        nextCurrMarble = nextIndex - currBoard.length
      }
      // console.log('finished board: ', newBoard)
  }
  return [newBoard, nextCurrMarble]
}

function removeMarble(currBoard, currentMarbleIndex) {
  console.log('\n-------------------\n')
  console.log('board length: ', currBoard.length)
  console.log('currentMarbleIndex: ', currentMarbleIndex)
  const marbleIndexToRemove = currentMarbleIndex - 7 >= 0 ? currentMarbleIndex - 7 : currBoard.length - (Math.abs(currentMarbleIndex - 7))
  console.log('marbleIndexToRemove: ', marbleIndexToRemove)
  console.log([currBoard[marbleIndexToRemove], currBoard[marbleIndexToRemove + 1]])
  const newBoard = [...currBoard]
  newBoard.splice(marbleIndexToRemove, 1)
  const removedMarble = currBoard[marbleIndexToRemove]
  console.log([newBoard[marbleIndexToRemove]])
  console.log('removedMarble :', removedMarble)
  return [newBoard, marbleIndexToRemove, removedMarble]
}

const playerArray = Array(418).fill(null).map(_ => makePlayer())

let board = [0]

let nextPlayer = 0
let currentMarble = 0

for (let nextMarbleValue = 1; nextMarbleValue <= 7133900; nextMarbleValue++) {
  // console.log(nextMarbleValue)
  if (nextMarbleValue % 23 === 0) {
    // console.log(nextPlayer)
    const [boardWithMarbleRemoved, nextCurrMarbleIndex, removedMarble] = removeMarble(board, currentMarble)
    playerArray[nextPlayer].score += (nextMarbleValue + removedMarble)
    currentMarble = nextCurrMarbleIndex
    board = boardWithMarbleRemoved
  } else {
    [board, currentMarble] = placeMarble(board, nextMarbleValue, currentMarble)
    // console.log(currentMarble)
  }
  nextPlayer = nextPlayer < 417 ? nextPlayer + 1 : 0
}

// console.log(playerArray)
console.log(Math.max(...playerArray.map(it => it.score)))