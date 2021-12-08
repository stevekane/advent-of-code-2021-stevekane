const { readFileSync } = require("fs")

function renderSegments(segments) {
  const width = 7
  const height = 7
  const buffer = new Array(width * height).fill(" ")
  const renderSettings = [
    { indices: [1,2,3,4], letter: "a" },
    { indices: [7,14], letter: "b" },
    { indices: [12,19], letter: "c" },
    { indices: [22,23,24,25], letter: "d" },
    { indices: [28,35], letter: "e" },
    { indices: [33,40], letter: "f" },
    { indices: [43,44,45,46], letter: "g" },
  ]

  for (var i = 0; i < segments.length; i++) {
    let on = segments[i]
    let { indices, letter } = renderSettings[i]
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

const pixels = [ 1,1,1,1,1,1,1 ]

console.log(renderSegments(pixels))