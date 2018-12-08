const input = `Step O must be finished before step W can begin.
Step S must be finished before step V can begin.
Step Z must be finished before step B can begin.
Step F must be finished before step R can begin.
Step I must be finished before step D can begin.
Step W must be finished before step P can begin.
Step J must be finished before step E can begin.
Step P must be finished before step N can begin.
Step Q must be finished before step V can begin.
Step D must be finished before step K can begin.
Step X must be finished before step N can begin.
Step E must be finished before step B can begin.
Step L must be finished before step H can begin.
Step A must be finished before step T can begin.
Step U must be finished before step R can begin.
Step M must be finished before step T can begin.
Step V must be finished before step R can begin.
Step N must be finished before step C can begin.
Step T must be finished before step C can begin.
Step Y must be finished before step B can begin.
Step H must be finished before step B can begin.
Step B must be finished before step C can begin.
Step C must be finished before step K can begin.
Step R must be finished before step K can begin.
Step G must be finished before step K can begin.
Step Q must be finished before step K can begin.
Step U must be finished before step Y can begin.
Step L must be finished before step G can begin.
Step S must be finished before step D can begin.
Step E must be finished before step R can begin.
Step Z must be finished before step M can begin.
Step U must be finished before step K can begin.
Step Q must be finished before step H can begin.
Step T must be finished before step B can begin.
Step J must be finished before step Q can begin.
Step X must be finished before step V can begin.
Step Q must be finished before step U can begin.
Step T must be finished before step K can begin.
Step S must be finished before step B can begin.
Step L must be finished before step C can begin.
Step Q must be finished before step D can begin.
Step E must be finished before step K can begin.
Step N must be finished before step G can begin.
Step L must be finished before step T can begin.
Step E must be finished before step L can begin.
Step A must be finished before step N can begin.
Step V must be finished before step C can begin.
Step D must be finished before step L can begin.
Step O must be finished before step S can begin.
Step V must be finished before step Y can begin.
Step N must be finished before step T can begin.
Step I must be finished before step H can begin.
Step U must be finished before step N can begin.
Step O must be finished before step Y can begin.
Step J must be finished before step C can begin.
Step Y must be finished before step C can begin.
Step W must be finished before step A can begin.
Step M must be finished before step C can begin.
Step X must be finished before step E can begin.
Step S must be finished before step J can begin.
Step U must be finished before step C can begin.
Step H must be finished before step K can begin.
Step Q must be finished before step B can begin.
Step E must be finished before step G can begin.
Step N must be finished before step H can begin.
Step I must be finished before step J can begin.
Step P must be finished before step B can begin.
Step Z must be finished before step T can begin.
Step J must be finished before step M can begin.
Step C must be finished before step G can begin.
Step I must be finished before step B can begin.
Step D must be finished before step G can begin.
Step X must be finished before step T can begin.
Step O must be finished before step F can begin.
Step A must be finished before step Y can begin.
Step S must be finished before step G can begin.
Step X must be finished before step K can begin.
Step L must be finished before step M can begin.
Step A must be finished before step H can begin.
Step D must be finished before step H can begin.
Step U must be finished before step T can begin.
Step B must be finished before step K can begin.
Step S must be finished before step C can begin.
Step W must be finished before step R can begin.
Step M must be finished before step G can begin.
Step M must be finished before step H can begin.
Step J must be finished before step D can begin.
Step W must be finished before step Y can begin.
Step S must be finished before step Y can begin.
Step A must be finished before step G can begin.
Step P must be finished before step M can begin.
Step C must be finished before step R can begin.
Step Q must be finished before step Y can begin.
Step O must be finished before step H can begin.
Step O must be finished before step R can begin.
Step Q must be finished before step M can begin.
Step V must be finished before step B can begin.
Step H must be finished before step G can begin.
Step J must be finished before step V can begin.
Step M must be finished before step R can begin.
Step R must be finished before step G can begin.`
  .split('\n')
  .map(line => line.split(' '))
  .map(arr => [arr[1], arr[7]]) // Second array item depends on first array item

input

const stepInfo = input.reduce((acc, line) => {
  const [dependency, step] = line
  if (acc[step]) {
    acc[step].dependencies = [ ...acc[step].dependencies, dependency ]
  } else {
    acc[step] = { completed: false, dependencies: [] }
    acc[step].dependencies = [ dependency ]
  }
  if (!acc[dependency]) {
    acc[dependency] = { completed: false, dependencies: [] }
  }
  return acc
}, {})

let stepOrder = ''

function generateNextStep() {
  const availableSteps = Object.entries(resetStepInfoWithDurations)
    .filter(arr => {
      const [_, info] = arr
      const completedDependencies = info.dependencies
        .filter(letter => resetStepInfoWithDurations[letter].state === 'DONE')
      const areAllDependenciesComplete = completedDependencies.length === info.dependencies.length
      return (info.state === 'NOT STARTED') && areAllDependenciesComplete
    })
    .map(([key, _]) => key)
  console.log(availableSteps)

  const nextStep = availableSteps.sort()[0]
  // console.log(nextStep)

  if (nextStep && nextStep.length) {
    // stepOrder = stepOrder.concat(nextStep)
    // console.log(stepInfo[nextStep])
    return nextStep
  }
}

// generateNextStep()

// function generateStepOrder() {
//   for (let i = 1; i <= 26; i ++) {
//     generateNextStep()
//   }
// }

// generateStepOrder()

// console.log(stepOrder)

let duration = 60
const resetStepInfoWithDurations = Object.keys(stepInfo).sort()
  .reduce((acc, key) => ({
    ...acc,
    [key]: {
      dependencies: stepInfo[key].dependencies,
      state: 'NOT STARTED',
      duration: ++duration
    }
  }), {})

console.log(resetStepInfoWithDurations)

function makeWorker() {
  return {
    currentlyWorking: null,
    timeLeft: 0
  }
}

const workerArray = [makeWorker(), makeWorker(), makeWorker(), makeWorker(), makeWorker()]

console.log(workerArray)

// if not working:
//  determine next job
//  set time needed
// if working:
//  decrement time needed
function doWork() {
  let timeElapsed = 0
  let areAllStepsCompleted = false
  while (!areAllStepsCompleted) {
    timeElapsed++
    for (worker of workerArray) {
      // working job with time left
      if (worker.timeLeft > 0) {
        console.log(`Step ${worker.currentlyWorking} has ${worker.timeLeft} seconds left`)
        worker.timeLeft--
      // job is finished
      } else if (worker.currentlyWorking && worker.timeLeft === 0) {
        const finishedStep = worker.currentlyWorking
        // stop working
        worker.currentlyWorking = null
        // mark current step as done
        resetStepInfoWithDurations[finishedStep].state = 'DONE'
        // start next available step
        const nextStep = generateNextStep()
        if (nextStep) {
          worker.currentlyWorking = nextStep
          worker.timeLeft = resetStepInfoWithDurations[nextStep].duration - 1
          resetStepInfoWithDurations[nextStep].state = 'IN PROGRESS'
        }
      } else {
        const nextStep = generateNextStep()
        if (nextStep) {
          worker.currentlyWorking = nextStep
          worker.timeLeft = resetStepInfoWithDurations[nextStep].duration - 1
          resetStepInfoWithDurations[nextStep].state = 'IN PROGRESS'
        }
      }
    }
    const completedSteps = Object.values(resetStepInfoWithDurations).filter(step => step.state === 'DONE')
    areAllStepsCompleted = completedSteps.length === Object.values(resetStepInfoWithDurations).length
  }
  return timeElapsed
}

console.log(doWork())