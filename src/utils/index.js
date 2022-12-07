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

// This subroutine must be pasted into any JScript that calls 'Include'.
// NOTE: you may need to update your script engines and scripting runtime
// in order to successfully create the 'Scripting.FileSystemObject'.
//
function Include(file) {
  var fso, f
  fso = new ActiveXObject('Scripting.FileSystemObject')
  f = fso.OpenTextFile(file, 1)
  str = f.ReadAll()
  f.Close()
  return str
}


