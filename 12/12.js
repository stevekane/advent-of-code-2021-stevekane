const { readLines, contains, toGraph, histogram, forAll } = require("../utils")

function largeCave(n) {
  return n !== "start" && n !== "end" && n.toLowerCase() !== n
}

function smallCave(n) {
  return n !== "start" && n !== "end" && n.toUpperCase() !== n
}

function pt1Rule(name,path) {
  if (largeCave(name)) {
    return true
  } else {
    return !contains(name,path)
  }
}

function pt2Rule(name,path) {
  if (largeCave(name)) {
    return true
  } else if (name === "start") {
    return false
  } else {
    let smallCaveVisitHistogram = histogram(path.filter(smallCave))
    let timesVisitingThisCave = smallCaveVisitHistogram.get(name) || 0
    let availableSmallCaveVisit = forAll(v => v <= 1, smallCaveVisitHistogram.values())

    return timesVisitingThisCave === 0 || availableSmallCaveVisit
  }
}

function pathsTo(rule,dst,path,graph) {
  let src = path[path.length - 1]
  let connections = graph.get(src)

  if (src === dst) {
    return [path]
  } else if (connections == null) {
    return []
  } else {
    return connections
      .filter(c => rule(c,path))
      .flatMap(c => pathsTo(rule,dst,[...path,c],graph))
  }
}

const graph = toGraph(readLines(process.argv[2]).map(l => l.split("-")))
const pt1 = pathsTo(pt1Rule,"end",["start"],graph).length
const pt2 = pathsTo(pt2Rule,"end",["start"],graph).length

console.log(pt1)
console.log(pt2)