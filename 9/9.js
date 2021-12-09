const { toNat } = require("../utils")
const { readFileSync } = require("fs")
const { min } = Math
const input = readFileSync(process.argv[2], {encoding:"utf8"})
  .split("\r\n")
  .map(r => [...r].map(toNat))
const at = (i,x,y) => i[y][x]

let r = 0
let h = input.length
for (let j = 0; j < h; j++) {
  let w = input[j].length
  for (let i = 0; i < w; i++) {
    let ch = at(input,i,j)
    let mnh = Number.MAX_SAFE_INTEGER
    if (i-1 >= 0) mnh = min(mnh,at(input,i-1,j))
    if (i+1 <  w) mnh = min(mnh,at(input,i+1,j))
    if (j-1 >= 0) mnh = min(mnh,at(input,i,j-1))
    if (j+1 <  h) mnh = min(mnh,at(input,i,j+1))
    if (ch < mnh) r += 1+ch
  }
}

console.log(r)