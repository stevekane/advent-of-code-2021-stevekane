const { map } = require("../utils")

function addSnail(a,b) {
  return [ a, b ]  
}

function update(n,path,v) {
  let penultimate = path.length - 1
  for (let i = 0; i < penultimate; i++) {
    n = n[path[i]]
  }
  n[path[penultimate]] = v
}

function explode(n) {
  let { left, leftPath, explosionPath, exploded, right, rightPath } = explosionIndices(n)
  if (explosionPath == null) {
    return false
  } else {
    update(n,explosionPath,0)
    if (leftPath) {
      update(n,leftPath,exploded[0]+left)
    }
    if (rightPath) {
      update(n,rightPath,exploded[1]+right)
    }
  }
}

function explosionIndices(n,path=[],state={}) {
  if (n.length == null) {
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
      let pathl = [...path,0]
      let pathr = [...path,1]
      let statel = explosionIndices(n[0], pathl, state)
      let stater = explosionIndices(n[1], pathr, statel)
      return stater
    }
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

let exp1 = explosionIndices(ex1)
let exp2 = explosionIndices(ex2)
let exp3 = explosionIndices(ex3)
let exp4 = explosionIndices(ex4)
let exp5 = explosionIndices(ex5)

print(ex1)
explode(ex1)
print(ex1)

print(ex2)
explode(ex2)
print(ex2)

print(ex3)
explode(ex3)
print(ex3)

print(ex4)
explode(ex4)
print(ex4)

print(ex5)
explode(ex5)
print(ex5)