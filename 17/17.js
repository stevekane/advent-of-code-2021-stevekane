const { max } = Math

function launchVelocities([[xmin,xmax],[ymin,ymax]]) {
  let bestHeight = 0
  let hits = []

  for (let i = 0; i <= xmax; i++) {
    for (let j = ymin; j <= -ymin; j++) {
      let thisHeight = 0
      let x = 0
      let y = 0
      let vx = i
      let vy = j

      while (true) {
        thisHeight = max(thisHeight,y)
        if (x >= xmin && x <= xmax && y >= ymin && y <= ymax) {
          bestHeight = max(bestHeight,thisHeight)
          hits.push([i,j])
          break
        } else if (x > xmax) {
          break
        } else if (y < ymin) {
          break
        }
        x += vx
        y += vy
        vx = vx === 0 ? 0 : vx < 0 ? vx+1 : vx-1
        vy -= 1
      }
    }
  }
  return [ bestHeight, hits ]
}

let exampleBounds = [[20,30],[-10,-5]]
let inputBounds = [[111,161],[-154,-101]]
let [exampleMaxHeight,exampleVelocities] = launchVelocities(exampleBounds)
let [inputMaxHeight,inputVelocities] = launchVelocities(inputBounds)

console.log(`${exampleMaxHeight} among ${exampleVelocities.length} options`)
console.log(`${inputMaxHeight} among ${inputVelocities.length} options`)