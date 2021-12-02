const fs = require("fs")

function inputs(filePath) {
  const parseOptions = {
    encoding: "utf8",
    flag: "r"
  }
  const paramDelimiter = " "
  const commandDelimiter = "\r\n"
  const commands = 
    fs.readFileSync(filePath, parseOptions)
    .split(commandDelimiter)
    .map(n => n.split(paramDelimiter))
    .map(n => [ n[0], Number(n[1]) ])
  return commands
}

function destination([ position, depth ], [ direction, magnitude ]) {
  switch (direction) {
    case "down":    return [ position, depth + magnitude ]
    case "up":      return [ position, depth - magnitude ]
    case "forward": return [ position + magnitude, depth ]
  }
}

function destinationWithAim([ aim, position, depth ], [ direction, magnitude ]) {
  switch (direction) {
    case "down":    return [ aim + magnitude, position, depth ]
    case "up":      return [ aim - magnitude, position, depth ]
    case "forward": return [ aim, position + magnitude, depth + aim * magnitude ]
  }
}

const example = inputs("./2/2.example")
const result = example.reduce(destination, [ 0, 0 ])
const resultWithAim = example.reduce(destinationWithAim, [ 0, 0, 0 ])
const commands = inputs("./2/2.input")
const location = commands.reduce(destination, [ 0, 0 ])
const locationWithAim = commands.reduce(destinationWithAim, [ 0, 0, 0 ])

console.log(result[0] * result[1])
console.log(location[0] * location[1])
console.log(resultWithAim[1] * resultWithAim[2])
console.log(locationWithAim[1] * locationWithAim[2])