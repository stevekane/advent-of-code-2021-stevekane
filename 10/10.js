const { readLines, add, sub } = require("../utils")
const { floor } = Math

function parse(line) {
  let stack = []
  let wrong
  parser:
  for (var i = 0; i < line.length; i++) {
    switch (line[i]) {
      case "[":
      case "(":
      case "{":
      case "<":
        stack.push(line[i])
      break
      case "]":
      case ")":
      case "}":
      case ">":
        let left = stack.pop()
        let right = line[i]
        if (right != pair(left)) {
          wrong = right
          break parser
        }
      break
    }
  }

  if (wrong != null) {
    return { state: "corrupted", wrong }
  } else if (stack.length) {
    return { state: "incomplete", stack }
  } else {
    return { state: "ok" }
  }
}

function pair(l) {
  if (l === "(") return ")"
  if (l === "[") return "]"
  if (l === "{") return "}"
  if (l === "<") return ">"
}

function syntaxErrorScore(r) {
  if (r === ")") return 3
  if (r === "]") return 57
  if (r === "}") return 1197
  if (r === ">") return 25137
}

function autocompleteScore(l) {
  if (l === ")") return 1
  if (l === "]") return 2
  if (l === "}") return 3
  if (l === ">") return 4
}

const pt1 = readLines(process.argv[2])
  .map(parse)
  .reduce((cs,r) => 
    r.state === "corrupted" 
      ? [...cs, r.wrong] 
      : cs, [])
  .map(syntaxErrorScore)
  .reduce(add)

const pt2 = readLines(process.argv[2])
  .map(parse)
  .reduce((cs,r) => 
    r.state === "incomplete" 
      ? [...cs, r.stack.reverse()] 
      : cs, [])
  .map((c) => c
    .map(pair)
    .map(autocompleteScore)
    .reduce((acc,s) => 5*acc+s,0))
  .sort(sub)

console.log(pt1)
console.log(pt2[floor(pt2.length/2)])