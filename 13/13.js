const { readFileSync } = require("fs")
const { hash, unhash, toNat, map, fold } = require("../utils")
const { max } = Math

function foldPaper(dots,[axis,v]) {
  if (axis === "x") {
    return map(([i,j]) => i > v  ? [2*v-i,j] : [i,j],dots)
  } else {
    return map(([i,j]) => j > v  ? [i,2*v-j] : [i,j],dots)
  }
}

function visibleDots(dots) {
  return map(unhash,new Set(map(hash,dots)))
}

function dimensions(dots) {
  return fold(([x,y],[i,j]) => [max(x,i+1),max(y,j+1)],[0,0],dots)
}

function renderPaper(dots) {
  let [width,height] = dimensions(dots)
  let pixels = []
  for (let j = 0; j < height; j++) {
    pixels.push([])
    for (let i = 0; i < width; i++) {
      pixels[j].push(0)
    }
  }
  for (let [x,y] of dots) {
    pixels[y][x] = 1 
  }
  return pixels.map(row => row.map(c => c ? "#" : ".").join("")).join("\n")
}

let sections = 
  readFileSync(process.argv[2],{encoding:"utf8"})
  .split("\r\n\r\n")
let dots = 
  sections[0]
  .split("\r\n")
  .map(l => l.split(",").map(toNat))
let folds =
  sections[1]
  .split("\r\n")
  .map(l => l.replace("fold along ",""))
  .map(l => l.split("="))
  .map(eq => [eq[0],toNat(eq[1])])

console.log(visibleDots(foldPaper(dots,folds[0])).length)
console.log(renderPaper(fold(foldPaper,dots,folds)))