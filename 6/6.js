const fs = require("fs")

function incrementOrSet(k,v,m) {
  if (m.has(k)) 
    m.set(k,v + m.get(k))
  else 
    m.set(k,v)
}

function evolve(spawnPeriod, oldfish) {
  const newfish = new Map
  for (let remainingDays of oldfish.keys()) {
    let population = oldfish.get(remainingDays)
    if (remainingDays === 0) {
      incrementOrSet(spawnPeriod + 2 - 1, population, newfish)
      incrementOrSet(spawnPeriod - 1, population, newfish)
    } else {
      incrementOrSet(remainingDays - 1, population, newfish)
    }
  }
  return newfish
}

function evolveNGenerations(generations, spawnPeriod, fish) {
  for (var i = 0; i < generations; i++) {
    fish = evolve(spawnPeriod, fish)
  }
  return fish
}

function fishCount(fish) {
  var count = 0
  for (var pop of fish.values()) {
    count += pop
  }
  return count
}

function populateFromInitialSample(sample) {
  const initialFish = new Map
  for (let s of sample) {
    incrementOrSet(s, 1, initialFish)
  }
  return initialFish
}

const example = fs.readFileSync("./6/6.example", { encoding: "utf8" })
  .split(",")
  .map(n => parseInt(n,10))
const input = fs.readFileSync("./6/6.input", { encoding: "utf8" })
  .split(",")
  .map(n => parseInt(n,10))

console.log(fishCount(evolveNGenerations(80, 7, populateFromInitialSample(example))))
console.log(fishCount(evolveNGenerations(80, 7, populateFromInitialSample(input))))
console.log(fishCount(evolveNGenerations(256, 7, populateFromInitialSample(example))))
console.log(fishCount(evolveNGenerations(256, 7, populateFromInitialSample(input))))