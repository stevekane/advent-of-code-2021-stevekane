const { readText, incrementBy, fold, pairs, add, toMap, last, ntimes } = require("../utils")
const { min, max } = Math

function sequenceOccurrences(p) {
  let m0 = new Map
  let ps = pairs(add,p)
  return fold((os,k) => incrementBy(os,[[k,1]]),m0,ps)
}

function evolveOccurrences(rs,o) {
  let m0 = new Map
  let o0 = o.entries()
  return fold((o,[p,n]) => {
    let i = rs.get(p)
    let lp = p[0]+i
    let rp = i+p[1]
    return incrementBy(o,[[lp,n],[rp,n]])
  },m0,o0)
}

function letterCounts(c,os) {
  let m0 = new Map([[c,1]])
  let o0 = os.entries()
  return fold((m,[p,n]) => incrementBy(m,[[p[0],n]]),m0,o0)
}

let inputPath = process.argv[2]
let stepCount = process.argv[3]
let sections = readText(inputPath).split("\r\n\r\n")
let polymer = sections[0]
let rules = toMap(sections[1].split("\r\n").map(r => r.split(" -> ")))
let rightmost = last(polymer)
let occ0 = sequenceOccurrences(polymer,rules)
let occ = ntimes(stepCount,o => evolveOccurrences(rules,o),occ0)
let counts = letterCounts(rightmost,occ)
let mostFrequent = fold(max,0,counts.values())
let leastFrequent = fold(min,Number.MAX_SAFE_INTEGER,counts.values())

console.log(mostFrequent-leastFrequent)