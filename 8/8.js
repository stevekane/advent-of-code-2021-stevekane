const { readFileSync } = require("fs")
const { log, toNat, toSet, add, isSuperset, difference, equal } = require("../utils")

function correctDigits([ signals, outputs ]) {
  const one        = toSet(signals.find(s => s.length === 2))
  const seven      = toSet(signals.find(s => s.length === 3))
  const four       = toSet(signals.find(s => s.length === 4))
  const eight      = toSet(signals.find(s => s.length === 7))
  const fives      = signals.filter(s => s.length === 5).map(toSet)
  const sixes      = signals.filter(s => s.length === 6).map(toSet)
  const bd         = difference(four,one)
  const three      = fives.find(l => isSuperset(l,one))
  const zero       = sixes.find(l => !isSuperset(l,bd))
  const nine       = sixes.filter(f => f != zero).find(f => isSuperset(f,one))
  const six        = sixes.find(f => f != zero && f != nine)
  const d          = difference(eight,zero)
  const b          = difference(bd,d)
  const five       = fives.filter(f => f != three).find(f => isSuperset(f,b)) 
  const two        = fives.find(f => f != three && f != five)
  const patterns   = [ zero, one, two, three, four, five, six, seven, eight, nine ]
  const outputSets = outputs.map(toSet)
  const digits     = outputSets.reduce((s,d) => s+patterns.findIndex(s => equal(d,s)),"")

  return digits
}

const path = process.argv[2]
const options = { encoding: "utf8" }
const input =
  readFileSync(path, options)
  .split("\n")
  .map(i => 
    i
    .split("|")
    .map(c => 
      c
      .trim()
      .split(" ")))
const uniqueLengths = [0,0,1,1,1,0,0,1,0]
const occurrences = 
  input
  .reduce((s,[_,ds]) => 
    s+ds.reduce((c,d) => 
      c+uniqueLengths[d.length],0),0)
const sumOfAllDisplays = 
  input
  .map(correctDigits)
  .map(toNat)
  .reduce(add)

log(occurrences)
log(sumOfAllDisplays)