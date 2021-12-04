const fs = require("fs")

function parse(filePath) {
  const parseOptions = {
    encoding: "binary",
    flag: "r"
  }
  const content = fs.readFileSync(filePath, parseOptions)
    .split("\r\n")

  return content
}

function toInt(xs) {
  let int = 0
  let pow = 0
  for (var i = xs.length - 1; i >= 0; i--) {
    int += Number(xs[i]) * (Math.pow(2,pow) | 0)
    pow += 1
  }
  return int
}

const example = parse("./3/3.input")
const bitwidth = example[0].length

let biases = new Array(bitwidth).fill(0)
for (var i = 0; i < example.length; i++) {
  for (var j = 0; j < bitwidth; j++) {
    biases[j] += example[i][j] > 0 ? 1 : -1
  }
}
let mcb = biases.map(b => b >= 0 ? 1 : 0)
let lcb = mcb.map(b => !b | 0)
let gammerate = toInt(mcb)
let epsilonrate = toInt(lcb)
let result = gammerate * epsilonrate

function mostCommonBitAt(index, xs) {
  var balance = 0
  for (var i = 0; i < xs.length; i++) {
    balance += xs[i][index] == 1 ? 1 : -1
  }
  return balance >= 0 ? "1" : "0"
}

function oxrating(xs) {
  const bitwidth = xs[0].length

  for (var i = 0; i < bitwidth; i++) {
    if (xs.length <= 1)
      break
    
    let bit = mostCommonBitAt(i, xs) == "1" ? "1" : "0"
     
    for (var j = 0; j < xs.length; ) {
      if (xs[j][i] === bit) {
        j++
      } else {
        xs.splice(j, 1)
      }
    }
  }
  return xs[0]
}

function corating(xs) {
  const bitwidth = xs[0].length

  for (var i = 0; i < bitwidth; i++) {
    if (xs.length <= 1)
      break
    
    let bit = mostCommonBitAt(i, xs) == "1" ? "0" : "1"

    for (var j = 0; j < xs.length; ) {
      if (xs[j][i] === bit) {
        j++
      } else {
        xs.splice(j, 1)
      }
    }
  }
  return xs[0]
}

const ox = oxrating([ ...example ])
const oxint = toInt(ox)
const co = corating([ ...example ])
const coint = toInt(co)
const final = oxint * coint

console.log(ox)
console.log(oxint)
console.log(co)
console.log(coint)
console.log(result)
console.log(final)