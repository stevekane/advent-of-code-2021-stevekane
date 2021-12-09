const { toNat, range, cartesianProduct, product, toArray } = require("../utils")
const { readFileSync } = require("fs")

function at(i,[x,y]) {
  return i[y][x]
}

function lowpoint(i,w,h,[x,y]) {
  let c         = at(i,[x,y])
  let flowleft  = x-1 >= 0 && at(i,[x-1,y]) < c
  let flowright = x+1 <  w && at(i,[x+1,y]) < c
  let flowup    = y-1 >= 0 && at(i,[x,y-1]) < c
  let flowdown  = y+1 <  h && at(i,[x,y+1]) < c

  return !(flowleft || flowright || flowup || flowdown)
}

function fill(i,w,h,pt) {
  let stack = [pt]
  let set = new Set
  let checked = new Set

  while (stack.length) {
    let item = stack.pop()
    let [x,y] = item
    let itemhash = JSON.stringify(item)

    if (checked.has(itemhash)) 
      continue

    checked.add(itemhash)
    if (x >= 0 && x < w && y >= 0 && y < h && at(i,item) < 9) {
      set.add(itemhash)
      stack.push([x-1,y])
      stack.push([x+1,y])
      stack.push([x,y-1])
      stack.push([x,y+1])
    }
  }
  return set
}

const path = process.argv[2]
const opts = {encoding:"utf8"}
const input = readFileSync(path,opts).split("\r\n").map(r => toArray(r).map(toNat))
const h = input.length
const w = input[0].length
const pts = cartesianProduct([...range(w)],[...range(h)])
const lowpoints = pts.filter(pt => lowpoint(input,w,h,pt))
const danger = lowpoints.reduce((r,pt) => r+1+at(input,pt),0)
const basins = lowpoints.map(pt => fill(input,w,h,pt))
const prodTop3Basins = product(basins.map(b => b.size).sort((a,b) => b-a).slice(0,3))

console.log(danger)
console.log(prodTop3Basins)