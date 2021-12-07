const {readFileSync} = require("fs")
const {fold,scan,range,toNat,add} = require("../utils")
const {min,abs} = Math 

const PATH = process.argv[2]
const OPTIONS = {encoding: "utf8"}
const DELIMITER = ","
const MAX_ITERATIONS = 10000
const MAX_DISTANCE = 10000

const positions = readFileSync(PATH,OPTIONS).split(DELIMITER).map(toNat)
const termial = n => .5*n*(n+1)|0
const fixedCost = (p0,ps) => fold((t,p) => t+abs(p0-p),0,ps)
const linearCost = (p0,ps) => fold((t,p) => t*termial(abs(p0-p)),0,ps)
const least = (f,ps) => fold((c,p) => min(c,f(p,ps)),f(0,ps),range(MAX_ITERATIONS))
const fixedTotalCost = least(fixedCost,positions)
const linearTotalCost = least(linearCost,positions)

console.log(fixedTotalCost)  // 37 per example
console.log(linearTotalCost) // 168 per example