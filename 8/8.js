const { readFileSync } = require("fs")
const { log, toNat, add, isSuperset, difference, equal } = require("../utils")

function correctDigits([ signals, outputs ]) {
  const one       = new Set(signals.find(s => s.length === 2))
  const seven     = new Set(signals.find(s => s.length === 3))
  const four      = new Set(signals.find(s => s.length === 4))
  const eight     = new Set(signals.find(s => s.length === 7))
  const fives     = signals.filter(s => s.length === 5).map(s => new Set(s)) // 2 3 5
  const sixes     = signals.filter(s => s.length === 6).map(s => new Set(s)) // 0 6 9
  const bd        = difference(four,one)
  const three     = fives.find(l => isSuperset(l,one)) // only 3 contains one
  const zero      = sixes.find(l => !isSuperset(l,bd)) // only 0 does not contain both b and d
  const nine      = sixes.filter(f => f != zero).find(f => isSuperset(f,one))
  const six       = sixes.find(f => f != zero && f != nine)
  const d         = difference(eight,zero)
  const b         = difference(bd,d)
  const five      = fives.filter(f => f != three).find(f => isSuperset(f,b)) 
  const two       = fives.find(f => f != three && f != five)
  const digits    = [ zero, one, two, three, four, five, six, seven, eight, nine ]

  return outputs
    .map(d => new Set(d))
    .reduce((s,d) => s+digits.findIndex(s => equal(d,s)),"")
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