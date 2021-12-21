const { readText, flatMap, fold, map, add, mul, sum, product } = require("../utils")
const { min, max } = Math

function toBinary(hex) {
  switch (hex) {
    case '0': return "0000"
    case '1': return "0001"
    case '2': return "0010"
    case '3': return "0011"
    case '4': return "0100"
    case '5': return "0101"
    case '6': return "0110"
    case '7': return "0111"
    case '8': return "1000"
    case '9': return "1001"
    case 'A': return "1010"
    case 'B': return "1011"
    case 'C': return "1100"
    case 'D': return "1101"
    case 'E': return "1110"
    case 'F': return "1111"
  }
}

function parseLiteral(b) {
  switch (b[0]) {
    case "0": {
      return [ 5, b.slice(5), b.slice(1,5) ]
    }
    case "1": {
      let [ restBitLength, remaining, rest ] = parseLiteral(b.slice(5))
      return [ 5 + restBitLength, remaining, b.slice(1,5) + rest ]
    }
  }
}

function parsePacket(b) {
  const versionBitLength = 3
  const typeIDBitLength = 3
  let version = parseInt(b.slice(0,3),2)
  let typeID = parseInt(b.slice(3,6),2)

  switch (typeID) {
    case 4: {
      let [ literalBitLength, remaining, literalBits ] = parseLiteral(b.slice(6))
      let literal = parseInt(literalBits,2)
      let bitLength 
        = versionBitLength 
        + typeIDBitLength 
        + literalBitLength

      return [ 
        bitLength, 
        remaining, 
        { typeID, version, literal }
      ]
    }
    default: {
      const lengthIDBitLength = 1
      let lengthTypeID = b.slice(6,7)
      
      switch (lengthTypeID) {
        case "0": {
          const subpacketCountBitLength = 15
          let subpacketBitLength = parseInt(b.slice(7,22),2)
          let bitLength
            = versionBitLength
            + typeIDBitLength 
            + lengthIDBitLength 
            + subpacketCountBitLength 
            + subpacketBitLength
          let remaining = b.slice(22)
          let subpackets = []
          let bitsConsumed = 0

          // accumulate subpackets by bit-consumption
          while (bitsConsumed < subpacketBitLength) {
            let [ spBitLength, spRemaining, sp ] = parsePacket(remaining)
            bitsConsumed += spBitLength
            remaining = spRemaining
            subpackets.push(sp)
          }
          return [ 
            bitLength, 
            remaining, 
            { typeID, version, lengthTypeID, subpacketBitLength, subpackets }
          ]
        }
        case "1": {
          const subpacketCountBitLength = 11
          let subpacketCount = parseInt(b.slice(7,18),2)
          let bitLength
            = versionBitLength 
            + typeIDBitLength 
            + lengthIDBitLength 
            + subpacketCountBitLength 
          let remaining = b.slice(18)
          let subpackets = []

          // accumulate subpackets by number
          for (var i = 0; i < subpacketCount; i++) {
            let [ spBitLength, spRemaining, sp ] = parsePacket(remaining)
            remaining = spRemaining
            bitLength += spBitLength
            subpackets.push(sp)
          }

          return [ 
            bitLength,
            remaining,  
            { typeID, version, lengthTypeID, subpacketCount, subpackets }
          ]
        }
      }
    }
  }
}

function pt1SumVersions({version,subpackets}) {
  if (subpackets == null) {
    return version
  } else {
    return version+fold((s,p) => s+pt1SumVersions(p),0,subpackets)
  }
}

function pt2Normalize({typeID,literal,subpackets}) {
  if (literal != null) {
    return literal
  } else {
    switch (typeID) {
      case 0: return sum(map(pt2Normalize,subpackets))
      case 1: return product(map(pt2Normalize,subpackets))
      case 2: return min(...map(pt2Normalize,subpackets))
      case 3: return max(...map(pt2Normalize,subpackets))
      case 5: return pt2Normalize(subpackets[0]) > pt2Normalize(subpackets[1]) ? 1 : 0
      case 6: return pt2Normalize(subpackets[0]) < pt2Normalize(subpackets[1]) ? 1 : 0
      case 7: return pt2Normalize(subpackets[0]) === pt2Normalize(subpackets[1]) ? 1 : 0
    }
  }
}

function decode(hex) {
  return parsePacket(flatMap(toBinary,hex).join(""))[2]
}

let input = decode(readText(process.argv[2]))
let pt1 = `Sum of versions is: ${pt1SumVersions(input)}`
let pt2 = `Total value is: ${pt2Normalize(input)}`

console.log(pt1)
console.log(pt2)