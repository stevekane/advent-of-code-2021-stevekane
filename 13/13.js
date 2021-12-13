const { readFileSync } = require("fs")
const { toNat, Array2D, uniques, count } = require("../utils")
const { max } = Math

function foldPaper(dots,[axis,v]) {
  if (axis === "x") {
    return dots.map(([i,j]) => i > v  ? [2*v-i,j] : [i,j])
  } else {
    return dots.map(([i,j]) => j > v  ? [i,2*v-j] : [i,j])
  }
}

function dimensions(dots) {
  return dots.reduce(([x,y],[i,j]) => [max(x,i+1),max(y,j+1)],[0,0])
}

function renderPaper(dots) {
  let [width,height] = dimensions(dots)
  let pixels = Array2D(width,height,0)

  return dots
    .reduce((pixels,[x,y]) => { pixels[y][x] = 1; return pixels },pixels)
    .map(row => row
      .map(c => c ? "#" : ".")
      .join(""))
    .join("\n")
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

console.log(count(uniques(foldPaper(dots,folds[0]))))
console.log(renderPaper(folds.reduce(foldPaper,dots)))