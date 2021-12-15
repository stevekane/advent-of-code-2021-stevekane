const { readLines, toNat, hash, map, transpose, forAll, sum, Array2D, contains } = require("../utils")
const { min } = Math

function cardinalNeighbors(w,h,[x,y]) {
  let cn = []
  if (y > 0)   cn.push([x,y-1])
  if (x < w-1) cn.push([x+1,y])
  if (y < h-1) cn.push([x,y+1])
  if (x > 0)   cn.push([x-1,y])
  return cn
}

function equals([x1,y1],[x2,y2]) {
  return x1 === x2 && y1 === y2
}

function path({w,h,cells},from) {
  let visited = new Set
  let weights = Array2D(w,h,Infinity)
  let stack = []

  weights[from[0]][from[1]] = 0
  stack.unshift(from)
  visited.add(hash(from))
  while (stack.length) {
    let node = stack.shift()
    let [x,y] = node
    let neighbors = cardinalNeighbors(w,h,node)

    for (let n of neighbors) {
      let [nx,ny] = n
      if (!visited.has(hash(n))) {
        weights[nx][ny] = cells[nx][ny]
        stack.unshift(n)
      }
    }
    visited.add(hash(node))
  }
  console.log(visited.size)
  return weights
}

const cells = transpose(map(l => map(toNat,l), readLines(process.argv[2])))
const w = cells.length
const h = cells[0].length
const grid = { w,h,cells }
const origin = [0,0]
const destination = [w-1,h-1]
const p = path(grid,origin,destination)

console.log(p)
console.log(cardinalNeighbors(w,h,[0,0]))
console.log(cardinalNeighbors(w,h,[1,1]))