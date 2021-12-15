const { readFileSync } = require("fs")
const { fold, pairs, add, toMap, last } = require("../utils")
const { min, max } = Math

function sequenceOccurrences(polymer) {
  return fold((m,p) => { 
    let current = m.get(p) || 0
    return m.set(p, 1+current)
  }, new Map, pairs(add,polymer))
}

function evolveOccurrences(prev,rules) {
  return fold((next,[pair,count]) => {
    let insertion = rules.get(pair)
    let lpair = pair[0] + insertion
    let rpair = insertion + pair[1]
    next.set(lpair, count+(next.get(lpair) || 0))
    next.set(rpair, count+(next.get(rpair) || 0))
    return next
  }, new Map, prev.entries())
}

function letterCounts(rightmost,occurrences) {
  return fold((counts,[pair,count]) => {
    let current = counts.get(pair[0]) || 0
    counts.set(pair[0], count + current)
    return counts
  }, new Map([[rightmost,1]]), occurrences.entries())
}

let stepCount = process.argv[3]
let sections = readFileSync(process.argv[2], { encoding: "utf8" }).split("\r\n\r\n")
let polymer = sections[0]
let rules = toMap(sections[1].split("\r\n").map(r => r.split(" -> ")))
let occ = sequenceOccurrences(polymer,rules)
let rightmost = last(polymer)

for (let i = 0; i < stepCount; i++) {
  occ = evolveOccurrences(occ,rules)
}
let counts = letterCounts(rightmost,occ)
let mostFrequent = fold(max,0,counts.values())
let leastFrequent = fold(min,Number.MAX_SAFE_INTEGER,counts.values())

console.log(mostFrequent-leastFrequent)