let incFrom = (z,m,[k,v]) => m.set(k,(m.get(k)||z)+v)
let ntimes = (n,f,x) => {
  if (n === 0) return x
  else         return ntimes(n-1,f,f(x))
}
let evolve = o => [...o.entries()].reduce((n,[r,p]) => {
  if (r === 0) return incFrom(0,incFrom(0,n,[8,p]),[6,p])
  else         return incFrom(0,n,[r-1,p])
}, new Map)
let count = m => [...m.values()].reduce((a,b) => a+b,0)
let initial = 
  require("fs").readFileSync(process.argv[2],{encoding:"utf8"})
  .split(",")
  .map(n => parseInt(n))
  .reduce((m,n) => incFrom(0,m,[n,1]),new Map)
console.log(count(ntimes(18,evolve,initial))) // 26 for example input