const { hash, fold, map, contains, thereExists } = require("../utils")
const { min, max } = Math

function step([[x,y],[vx,vy]]) {
  return [
    [x+vx,y+vy],
    [vx === 0 ? vx : (vx < 0 ? vx+1 : vx-1),vy-1]
  ]
}

function inBounds([[xmin,xmax],[ymin,ymax]],[x,y]) {
  return x >= xmin && x <= xmax && y >= ymin && y <= ymax
}

function search(bounds) {
  let [[xmin,xmax],[ymin,ymax]] = bounds
  let bestHeight = 0
  let hits = []

  for (let i = 0; i <= xmax; i++) {
    for (let j = ymin; j <= -ymin; j++) {
      let thisHeight = 0
      let s = [[0,0],[i,j]]
      let x = 0
      let y = 0

      while (true) {
        x = s[0][0]
        y = s[0][1]
        thisHeight = max(thisHeight,y)
        if (inBounds(bounds,s[0])) {
          bestHeight = max(bestHeight,thisHeight)
          hits.push([i,j])
          break
        } else if (x > xmax) {
          break
        } else if (y < ymin) {
          break
        }
        s = step(s)
      }
    }
  }
  return [ bestHeight, hits ]
}

let exampleBounds = [[20,30],[-10,-5]]
let inputBounds = [[111,161],[-154,-101]]
let pt1 = search(exampleBounds)
let pt2 = search(inputBounds)

console.log(pt1[0])
console.log(pt1[1].length)
console.log(pt2[0])
console.log(pt2[1].length)