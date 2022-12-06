eval(Include('utils/toSlotReg.js'))
// eval(Include('utils/toPortStatusReg.js')) // deprecated
eval(Include('utils/toPortClassReg.js'))
eval(Include('utils/toPortWattsReg.js'))
eval(Include('utils/wattsToTwoPairsAmpere.js'))
eval(Include('utils/toTwoPairsVal.js'))
eval(Include('utils/toPortStatusVal.js'))

var utils = {
  toSlotReg: toSlotReg,
  toPortClassReg: toPortClassReg,
  toPortWattsReg: toPortWattsReg,
  wattsToTwoPairsAmpere: wattsToTwoPairsAmpere,
  toTwoPairsVal: toTwoPairsVal,
  toPortStatusVal: toPortStatusVal
}

