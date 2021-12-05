const fs = require("fs")

const runExample = process.argv[2] == "example"
const inputFilePath = runExample ? "./5/5.example" : "./5/5.input"
const lines = fs.readFileSync(inputFilePath, { encoding: "utf8" })
  .split("\r\n")
  .map(l => l.split(" -> ")
    .map(c => c.split(",")
    .map(n => parseInt(n,10))))

const dangerHash = new Map
for (let [[x1,y1],[x2,y2]] of lines) {
  const xdif = x2 - x1
  const ydif = y2 - y1
  const count = Math.max(Math.abs(xdif), Math.abs(ydif))
  const dx = xdif / count
  const dy = ydif / count

  for (var i = 0; i <= count; i++) {
    let pt = [x1 + dx * i, y1 + dy * i]
    let key = JSON.stringify(pt)

    if (dangerHash.has(key)) {
      dangerHash.set(key, dangerHash.get(key) + 1)
    } else {
      dangerHash.set(key, 1)
    }
  }
}

if (runExample) {
  const width = 10
  const height = 10
  for (let j = 0; j < height; j++) {
    let rowString = ""
    for (let i = 0; i < width; i++) {
      let key = JSON.stringify([i,j])

      rowString += (dangerHash.has(key) ? dangerHash.get(key) : ".") 
    }
    console.log(rowString)
  }
}

let dangerousPointCount = 0
for (let pt of dangerHash.values()) {
  dangerousPointCount += pt > 1 ? 1 : 0
}
console.log(dangerousPointCount)