const fs = require("fs")

module.exports = { 
  readLines, readText,
  log, 
  hash, unhash,
  Array2D,
  transpose,
  toNat, toSet, toMap, toArray, toGraph,
  cartesianProduct, isSuperset, difference, 
  symmetricDifference, union, equal,
  contains,
  add, mul, sub,
  sum, product, incrementBy, histogram, uniques, count,
  forAll, thereExists,
  fold, map, flatMap, filter, scan, range, pairs,
  first, last,
  ntimes
}

function readText(path) {
  return fs.readFileSync(path, { encoding:"utf8" })
}

function readLines(path) {
  return fs.readFileSync(path, { encoding: "utf8" }).split("\r\n")
}

function log(n) {
  return console.log(n)
}

function hash(d) {
  return JSON.stringify(d)
}

function unhash(d) {
  return JSON.parse(d)
}

function Array2D(width,height,initialValue) {
  let arr = []
  for (let j = 0; j < height; j++) {
    arr.push([])
    for (let i = 0; i < width; i++) {
      arr[j].push(initialValue)
    }
  }
  return arr
}

function transpose(input) {
  let width = input.length
  let height = input[0].length
  let output = []

  // initialize the transposed array
  for (var i = 0; i < width; i++) {
    output.push([])
    for (var j = 0; j < height; j++) {
      output[i].push(0)  
    }
  }
  // populate it from the input
  for (var j = 0; j < width; j++) {
    for (var i = 0; i < height; i++) {
      output[i][j] = input[j][i]
    }
  }
  return output
}

function toNat(n) {
  return parseInt(n)
}

function toSet(xs) {
  return new Set(xs)
}

function toMap(pairs) {
  return new Map(pairs)
}

function toArray(xs) {
  return [ ...xs ]
}

function toGraph(connections) {
  let map = new Map

  for (let [a,b] of connections) {
    let aOuts = map.get(a) || []
    let bOuts = map.get(b) || []

    aOuts.push(b)
    bOuts.push(a)
    map.set(a,aOuts)
    map.set(b,bOuts)
  }
  return map
}

function cartesianProduct(xs,ys) {
  let p = []
  for (let x of xs) {
    for (let y of ys) {
      p.push([x,y])
    }
  }
  return p 
}

function isSuperset(set,subset) {
  for (let e of subset) {
    if (!set.has(e)) {
      return false
    }
  }
  return true
}

function difference(a,b) {
  let d = new Set(a)
  for (let e of b) {
    d.delete(e)
  }
  return d
}

function symmetricDifference(a,b) {
  let d = new Set(a)
  for (let e of b) {
    if (d.has(e)) {
      d.delete(e)
    } else {
      d.add(e)
    }
  }
  return d
}

function union(a,b) {
  let u = new Set(a)
  for (let e of b) {
    u.add(e)
  }
  return u
}

function contains(a,xs) {
  for (let x of xs) {
    if (x == a) {
      return true
    }
  }
  return false
}

function count(xs) {
  return xs.length || xs.size
}

// set equality by elements
function equal(xs,ys) {
  if (xs.size != ys.size)
    return false

  for (let x of xs) {
    if (!contains(x,ys)) {
      return false
    }
  }
  return true
}

function add(a,b) {
  return a + b
}

function mul(a,b) {
  return a * b
}

function sub(a,b) {
  return a - b
}

function sum(xs) {
  return fold(add,0,xs)
}

function product(xs) {
  return fold(mul,1,xs)
}

function incrementBy(m,updates) {
  for (let [k,n] of updates) {
    m.set(k, n + (m.get(k) || 0))
  }
  return m
}

function histogram(xs) {
  var m = new Map

  for (let x of xs) {
    m.set(x,(m.get(x) || 0) + 1)
  }
  return m
}

function uniques(xs) {
  return map(unhash,new Set(map(hash,xs)))
}

function forAll(f,xs) {
  for (let x of xs) {
    if (!f(x)) {
      return false
    }
  }
  return true
}

function thereExists(f,xs) {
  for (let x of xs) {
    if (f(x)) {
      return true
    }
  }
  return false
}

function fold(f,y0,xs) {
  for (let x of xs) {
    y0 = f(y0,x)
  }
  return y0
}

function map(f,xs) {
  let ys = []
  for (let x of xs) {
    ys.push(f(x))
  }
  return ys
}

function flatMap(f,xs) {
  let ys = []
  for (let x of xs) {
    let fxs = f(x)
    ys.push(...fxs)
  }
  return ys
}

function * filter(p,xs) {
  for (let x of xs) {
    if (p(x)) {
      yield x
    }
  }
}

function scan(f,xs) {
  let ys = [xs.next().value]
  let count = 0
  for (let x of xs) {
    ys.push(f(ys[count++],x))
  }
  return ys
}

function * range(n) {
  for (var i = 0; i < n; i++)
    yield i
}

function pairs(f,xs) {
  let out = []
  for (let i = 1; i < xs.length; i++) {
    out.push(f(xs[i-1],xs[i-0]))
  }
  return out
}

function first(xs) {
  return xs[0]
}

function last(xs) {
  return xs[xs.length - 1]
}

function ntimes(n,f,x) {
  for (var i = 0; i < n; i++) {
    x = f(x)
  }
  return x
}