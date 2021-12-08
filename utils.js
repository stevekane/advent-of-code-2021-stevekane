module.exports = { 
  log, 
  toNat, 
  isSuperset, difference, symmetricDifference, union, 
  permutationOf,
  add, 
  sum, 
  fold, map, scan, range 
}

function log(n) {
  return console.log(n)
}

function toNat(n) {
  return parseInt(n)
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

function permutationOf(xs,ys) {
  if (xs.length != ys.length)
    return false

  for (let x of xs) {
    if (ys.indexOf(x) < 0) {
      return false
    }
  }
  return true
}

function add(a,b) {
  return a + b
}

function sum(xs) {
  return fold(add,0,xs)
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