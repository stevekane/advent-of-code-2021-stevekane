const {min,abs} = Math
const example = require("fs").readFileSync(process.argv[2],{encoding:"utf8"})
  .split(",")
  .map(n => parseInt(n))
const termial = n => {
  let t = 0
  for (let i = 1; i <= n; i++) {
    t+=i
  }
  return t
}
const fixedCost = (p0,crabs) => crabs.reduce((total,p) => total+abs(p0-p),0)
const linearCost = (p0,crabs) => crabs.reduce((total,p) => total+termial(abs(p0-p)),0)
const searchRaw = (costFn,crabs) => {
  let i = 0
  let lowestCost = 1000000000000

  while(i < 10000) {
    lowestCost = min(lowestCost, costFn(i,crabs))
    i++
  }
  return lowestCost
}
const fixedTotalCost = searchRaw(fixedCost,example)
const linearTotalCost = searchRaw(linearCost,example)

console.log(fixedTotalCost)
console.log(linearTotalCost)