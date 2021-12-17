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

function mindist({w,h,cells},distances,visited,[x,y]) {
  let unvisited = cardinalNeighbors(w,h,x,y).filter(n => !visited.has(hash(n)))

  visited.add(hash([x,y]))
  if (unvisited.length === 0) {
    return distances
  } else {
    let distance = distances[x][y]
    unvisited.forEach(([x,y]) => distances[x][y] = min(distances[x][y],distance+cells[x][y]))
    unvisited.sort(([x,y],[i,j]) => distances[x][y]-distances[i,j])
    return fold((dists,p) => visited.has(hash(p)) ? dists : mindist(grid,dists,visited,p),distances,unvisited)
  }
}

// stupidly-inefficient implementation
function dijkstra({w,h,cells},[x,y]) {
  let dist = Array2D(w,h,Infinity)
  dist[x][y] = 0
  let stack = cartesianProduct([...range(w)],[...range(h)])
  let visited = new Set

  while (stack.length) {
    let [idx,v] = stack.reduce(([idx1,[x1,y1]],[x2,y2],idx2) => {
      if (dist[x2][y2] < dist[x1][y1]) {
        return [idx2,[x2,y2]]
      } else {
        return [idx1,[x1,y1]]
      }
    },[0,stack[0]])
    let [i,j] = v
    let d = dist[i][j]

    stack.splice(idx,1)
    visited.add(hash(v))
    for (let [nx,ny] of cardinalNeighbors(w,h,i,j).filter(n => !visited.has(hash(n)))) {
      dist[nx][ny] = min(dist[nx][ny],d+cells[nx][ny])
    }
  }
  return dist
}

function print(cells) {
  console.log(transpose(cells).map(r => r.join("")).join("\n"))
}

let cells = transpose(map(l => map(toNat,l), readLines(process.argv[2])))
let w = cells.length
let h = cells[0].length
let bigcells = Array2D(w*5,h*5,0)
let m = 5
for (let i = 0; i < m; i++)
for (let j = 0; j < m; j++)
for (let x = 0; x < w; x++)
for (let y = 0; y < h; y++)
  bigcells[i*w+x][j*h+y] = ((cells[x][y]+i+j-1) % 9)+1

let dij1 = dijkstra({w,h,cells:cells},[0,0])
let dij2 = dijkstra({w:w*5,h:h*5,cells:bigcells},[0,0])

print(cells)
print(bigcells)
console.log(dij1[w-1][h-1])
console.log(dij2[m*w-1][m*h-1])