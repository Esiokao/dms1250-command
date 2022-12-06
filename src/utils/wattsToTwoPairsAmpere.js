// 20mA in 2 pairs mode
var offset = 20 //mA

// V * I = W
function wattsToTwoPairsAmpere(watts) {
  return ((watts * 1000) / 54 - offset) / 1000 / 2 // mA to A
}
