const { readLines, toNat, hash, map, transpose, fold, Array2D, cartesianProduct, range } = require("../utils")
const { min } = Math

function cardinalNeighbors(w,h,x,y) {
  let cn = []
  if (y > 0)   cn.push([x,y-1])
  if (x < w-1) cn.push([x+1,y])
  if (y < h-1) cn.push([x,y+1])
  if (x > 0)   cn.push([x-1,y])
  return cn
}

// stupidly-inefficient implementation
function dijkstra({w,h,cells},[x,y]) {
  let stack = [[x,y]]
  let visited = Array2D(w,h,false)
  let dist = Array2D(w,h,Infinity)
  dist[x][y] = 0

  while (stack.length) {
    let [i,j] = stack.shift()
    let neighbors = cardinalNeighbors(w,h,i,j).filter(([ni,nj]) => !visited[ni][nj])

    if (visited[i][j])
      continue

    visited[i][j] = true
    neighbors.forEach(([nx,ny]) => dist[nx][ny] = min(dist[nx][ny],dist[i][j]+cells[nx][ny]))
    neighbors.sort(([x1,y1],[x2,y2]) => dist[x1][y1]-dist[x2][y2])
    stack.push(...neighbors)
  }
  return dist
}

function print(cells) {
  console.log(transpose(cells).map(r => r.join("")).join("\n"))
}

let cells = transpose(map(l => map(toNat,l), readLines(process.argv[2])))
let w = cells.length
let h = cells[0].length
let m = 5
let bigcells = Array2D(w*m,h*m,0)
for (let i = 0; i < m; i++)
for (let j = 0; j < m; j++)
for (let x = 0; x < w; x++)
for (let y = 0; y < h; y++)
  bigcells[i*w+x][j*h+y] = ((cells[x][y]+i+j-1) % 9)+1

let g1 = {w,h,cells}
let g2 = {w:w*m,h:h*m,cells:bigcells}
let dij1 = dijkstra(g1,[0,0])
let dij2 = dijkstra(g2,[0,0])

console.log(dij1[w-1][h-1])
console.log(dij2[w-1][h-1])
console.log(dij2[w*m-1][h*m-1])