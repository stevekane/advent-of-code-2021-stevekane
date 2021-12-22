const { map } = require("../utils")
const { floor, ceil } = Math

function addSnail(a,b) {
  let sum = [ a, b ]
  print(sum)
  while (explode(sum) || split(sum)) {
    print(sum)
  }
  return sum
}

function isLeaf(n) {
  return n.length == null
}

// TODO: maybe could turn this into a cute fold?
function update(n,path,v) {
  let penultimate = path.length - 1
  for (let i = 0; i < penultimate; i++) {
    n = n[path[i]]
  }
  n[path[penultimate]] = v
}

function explosionIndices(n,path=[],state={}) {
  if (isLeaf(n)) {
    if (state.explosionPath == null) {
      return { ...state, leftPath: [...path], left: n }
    } else if (state.rightPath == null) {
      return { ...state, rightPath: [...path], right: n }
    } else {
      return state
    }
  } else {
    if (state.explosionPath == null && path.length === 4) {
      return { ...state, explosionPath: [...path], exploded: n }
    } else {
      let statel = explosionIndices(n[0], [...path,0], state)
      let stater = explosionIndices(n[1], [...path,1], statel)
      return stater
    }
  }
}

function explode(n) {
  let { left, leftPath, explosionPath, exploded, right, rightPath } = explosionIndices(n)
  if (explosionPath == null) {
    return false
  } else {
    update(n,explosionPath,0)
    if (leftPath) {
      update(n, leftPath, exploded[0]+left)
    }
    if (rightPath) {
      update(n, rightPath, exploded[1]+right)
    }
    return true
  }
}

function splitIndex(n,path=[],state={}) {
  if (isLeaf(n)) {
    if (n >= 10 && state.path == null) {
      return { ...state, path: [...path], value:n }
    } else {
      return state
    }
  } else {
    if (state.path == null) {
      let statel = splitIndex(n[0], [...path,0], state)
      let stater = splitIndex(n[1], [...path,1], statel)
      return stater
    } else {
      return state
    }
  }
}

function split(n) {
  let { path, value } = splitIndex(n)

  console.log({path, value})

  if (path == null) {
    return false
  } else {
    update(n, path, [floor(value/2),ceil(value/2)])
    return true
  }
}

function print(n) {
  return console.log(JSON.stringify(n))
}

let s1 = [1,2]
let s2 = [[3,4],5]
let ex1 = [[[[[9,8],1],2],3],4]
let ex2 = [7,[6,[5,[4,[3,2]]]]]
let ex3 = [[6,[5,[4,[3,2]]]],1]
let ex4 = [[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]
let ex5 = [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]

let l = [[[[4,3],4],4],[7,[[8,4],9]]]
let r = [1,1]
let lr = addSnail(l,r)

console.log(lr)

let testsplit = [[10,5],2]

split(testsplit)
console.log(testsplit)