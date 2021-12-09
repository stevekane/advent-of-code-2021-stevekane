module.exports = { 
  log, 
  toNat, toSet, toArray,
  isSuperset, difference, symmetricDifference, union, equal,
  contains,
  add, mul, sub,
  sum, product,
  fold, map, scan, range 
}

function log(n) {
  return console.log(n)
}

function toNat(n) {
  return parseInt(n)
}

function toSet(xs) {
  return new Set(xs)
}

function toArray(xs) {
  return [ ...xs ]
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