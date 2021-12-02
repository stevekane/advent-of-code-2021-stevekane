const fs = require("fs")
const inputPath = "./1/1.input"
const parseOptions = { 
  encoding: "utf8",
  flag: "r"
}
const delimiter = "\r\n"
const toNumber = n => parseInt(n)
const depths = 
  fs.readFileSync(inputPath, parseOptions)
  .split(delimiter)
  .map(toNumber)

function sumRange(offset, count, xs) {
  var sum = 0
  if (offset >= xs.length)
    return sum

  for (var i = 0; i < count; i++) {
    sum += xs[offset + i]
  }
  return sum
}

function increases(width, xs) {
  const minLength = width + 1
  const minIndex = 1
  const maxIndex = xs.length - width + 1

  if (xs.length < minLength)
    return 0

  var increases = 0
  var ub = sumRange(0, width, xs)
  var lb
  for (var i = minIndex; i < maxIndex; i++) {
    lb = ub
    ub = sumRange(i, width, xs)
    if (ub > lb) {
      increases += 1
    }
  }
  return increases
}

console.log(increases(1, depths))
console.log(increases(3, depths))