const {readFileSync} = require("fs")
const {log,fold,range,toNat} = require("../utils")
const {min,max,abs,floor} = Math 

const PATH = process.argv[2]
const OPTIONS = {encoding: "utf8"}
const DELIMITER = ","

const positions = readFileSync(PATH,OPTIONS).split(DELIMITER).map(toNat)
const termial = n => floor(.5*n*(n+1))
const fixedCost = (p0,ps) => fold((t,p) => t+abs(p0-p),0,ps)
const linearCost = (p0,ps) => fold((t,p) => t+termial(abs(p0-p)),0,ps)
const least = (f,ps) => fold((c,p) => min(c,f(p,ps)),f(0,ps),range(fold(max,0,ps)))
const fixedTotalCost = least(fixedCost,positions)
const linearTotalCost = least(linearCost,positions)

log(fixedTotalCost)  // 37 per example
log(linearTotalCost) // 168 per example

log(fold((ps,p) => readFileSync(process.argv[2],{encoding:"utf8"}),p==","?ps:ps.concat(toNat(p))))

log([
  ((f,ps) => fold((c,p) => min(c,f(p,ps)),f(0,ps),range(fold(max,0,ps))))((p0,ps) => fold((t,p) => t+abs(p0-p),0,ps),positions), 
  ((f,ps) => fold((c,p) => min(c,f(p,ps)),f(0,ps),range(fold(max,0,ps))))((p0,ps) => fold((t,p) => t+floor(.5*abs(p0-p)*(abs(p0-p)+1)),0,ps),positions)
]) // [37,168]