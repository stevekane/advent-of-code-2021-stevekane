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
  for (var i = minIndex; i < maxIndex; i++) {
    if (sumRange(i, width, xs) > sumRange(i-1, width, xs)) {
      increases += 1
    }
  }
  return increases
}

const example = [
  199,
  200,
  208,
  210,
  200,
  207,
  240,
  269,
  260,
  263
]

console.log(increases(1, depths))
console.log(increases(2, depths))
console.log(increases(3, depths))

console.log(increases(1, example))
console.log(increases(2, example))
console.log(increases(3, example))