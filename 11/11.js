const { readLines, sum, transpose, toNat, toArray } = require('../utils')

let grid = transpose(readLines(process.argv[2]).map(l => toArray(l).map(toNat)))
let steps = parseInt(process.argv[3])
let stepFlashes = [0]
let width = grid.length
let height = grid[0].length
for (let s = 0; s < steps; s++) {
  let flashes = []    // stack of flashes happening this frame
  let flashCount = 0  // number of flashes this frame

  // increment energy of all octopi recording initial flashes
  for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    grid[i][j]++
    if (grid[i][j] > 9) {
      flashes.push([i,j])
      flashCount++
    }
  }
  }
  
  // propagate all initial flashes and subsequent flashes
  while (flashes.length) {
    let [x,y] = flashes.pop()
    for (let nx = x-1; nx <= x+1; nx++) {
    for (let ny = y-1; ny <= y+1; ny++) {
      let isNeighbor = !(nx === x && ny === y)
      let inBounds = nx >= 0 && nx < width && ny >= 0 && ny < height

      if (isNeighbor && inBounds) {
        grid[nx][ny]++
        if (grid[nx][ny] === 10)  {{
          flashes.push([nx,ny])
          flashCount++
        }}
      }
    }
    }
  }

  // reset any flashed octopi
  for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    if (grid[i][j] > 9) {
      grid[i][j] = 0
    }
  }
  }
  stepFlashes.push(flashCount)
}

console.log(`${sum(stepFlashes.slice(0,100))} flashes after 100 steps`)
console.log(`All octopi flash on step ${stepFlashes.findIndex(f => f === width * height)}`)