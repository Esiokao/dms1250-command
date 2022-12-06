// 20mA in 2 pairs mode
var offset = 20 //mA

// default voltage is 54V
var volt = 54

// 2 pairs for af, at, bt mode by default
var pairs = 2
// V * I = W
function wattsToTwoPairsAmpere(watts) {
  // divide by two for 2 pairs, divide by  1000 for mA to A.
  return ((watts * 1000) / volt - offset) / 1000 / pairs
}
