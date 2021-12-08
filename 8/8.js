const { readFileSync } = require("fs")

const digitpixels = [
  [1,1,1,0,1,1,1],
  [0,0,1,0,0,1,0],
  [1,0,1,1,1,0,1],
  [1,0,1,1,0,1,1],
  [0,1,1,1,0,1,0],
  [1,1,0,1,0,1,1],
  [1,1,0,1,1,1,1],
  [1,0,1,0,0,1,0],
  [1,1,1,1,1,1,1],
  [1,1,1,1,0,1,1],
]
const indexToLetter = ["a","b","c","d","e","f","g"]
const letterToIndex = indexToLetter.reduce((m,l,i) => m.set(indexToLetter[i],i),new Map)
const pixelIndices = [
  [1,2,3,4],
  [7,14],
  [12,19],
  [22,23,24,25],
  [28,35],
  [33,40],
  [43,44,45,46]
]
function render(digit,wirings) {
  const width = 7
  const height = 7
  const buffer = new Array(width * height).fill(" ")
  const segments = digitpixels[digit]

  for (var i = 0; i < segments.length; i++) {
    let on = segments[i]
    let wiring = wirings[i]
    let indices = pixelIndices[wiring]
    let letter = indexToLetter[wiring]
    for (var j = 0; j < indices.length; j++) {
      let index = indices[j]
      buffer[index] = on ? letter : " "
    }
  }
  for (var i = 0; i < height; i++) {
    buffer[i * width + width - 1] = "\n"
  }
  return buffer.join("")
}

const idealWiring = [0,1,2,3,4,5,6]

const panels = [
  { digits: [0,3,5,7], wiring: idealWiring },
  { digits: [2,4,6,8], wiring: idealWiring },
  { digits: [1,3,3,7], wiring: idealWiring },
  { digits: [9,6,3,0], wiring: idealWiring },
]


for (let panel of panels) {
  for (let digit of panel.digits) {
    console.log(render(digit,panel.wiring))
  }
}