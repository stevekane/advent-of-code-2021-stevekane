const { toNat, product, sub } = require("../utils")
const { readFileSync } = require("fs")
const { min } = Math
const input = readFileSync(process.argv[2], {encoding:"utf8"})
  .split("\r\n")
  .map(r => [...r].map(toNat))
const at = (i,[x,y]) => i[y][x]

function lowpoint(i,w,h,[x,y]) {
  let c         = at(i,[x,y])
  let flowleft  = x-1 >= 0 && at(i,[x-1,y]) < c
  let flowright = x+1 <  w && at(i,[x+1,y]) < c
  let flowup    = y-1 >= 0 && at(i,[x,y-1]) < c
  let flowdown  = y+1 <  h && at(i,[x,y+1]) < c

  return !(flowleft || flowright || flowup || flowdown)
}

function flows(i,w,h,[x,y]) {
  let c         = at(i,[x,y])
  let flowleft  = x-1 >= 0 && at(i,[x-1,y]) < c
  let flowright = x+1 <  w && at(i,[x+1,y]) < c
  let flowup    = y-1 >= 0 && at(i,[x,y-1]) < c
  let flowdown  = y+1 <  h && at(i,[x,y+1]) < c
  let ends      = []

  if (!flowleft && !flowright && !flowup && !flowdown) {
    ends.push([x,y])
  } else {
    if (flowleft)  ends.push(...flows(i,w,h,[x-1,y],ends))
    if (flowright) ends.push(...flows(i,w,h,[x+1,y],ends))
    if (flowup)    ends.push(...flows(i,w,h,[x,y-1],ends))
    if (flowdown)  ends.push(...flows(i,w,h,[x,y+1],ends))
  }
  return ends
}

function flowsTo(i,w,h,pt,target) {
  for (let end of flows(i,w,h,pt)) {
    if (!(end[0] === target[0] && end[1] === target[1])) {
      return false
    }
  }
  return true
}

function basinTo(i,w,h,pt,target) {
  let [x,y]     = pt
  let c         = at(i,pt)
  let fromleft  = x-1 >= 0 && c < at(i,[x-1,y])
  let fromright = x+1 <  w && c < at(i,[x+1,y])
  let fromup    = y-1 >= 0 && c < at(i,[x,y-1])
  let fromdown  = y+1 <  h && c < at(i,[x,y+1])
  let basin = []

  if (c !== 9 && flowsTo(i,w,h,pt,target)) {
    basin.push(pt)
    if (fromleft)  basin.push(...basinTo(i,w,h,[x-1,y],target))
    if (fromright) basin.push(...basinTo(i,w,h,[x+1,y],target))
    if (fromup)    basin.push(...basinTo(i,w,h,[x,y-1],target))
    if (fromdown)  basin.push(...basinTo(i,w,h,[x,y+1],target))
  }
  return basin
}

let r = 0
let h = input.length
let bs = []
for (let j = 0; j < h; j++) {
  let w = input[j].length
  for (let i = 0; i < w; i++) {
    let pt = [i,j]

    if (lowpoint(input,w,h,pt)) {
      bs.push(basinTo(input,w,h,pt,pt))
      r += 1+at(input,pt)
    }
  }
}

const basinSizes = 
  bs.map(b => (new Set(b.map(p => JSON.stringify(p))).size))
  .sort((a,b) => b - a)
  .slice(0,3)

console.log(basinSizes)
console.log(product(basinSizes))