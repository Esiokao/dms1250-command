eval(Include('apis/send.js'))
eval(Include('apis/sleep.js'))
eval(Include('apis/setClass.js'))
eval(Include('utils/index.js'))

var cache = {}

function setWatts(watts) {
  return function portNumReceiver(portNum) {
    var mA = utils.wattsToTwoPairsAmpere(watts)
    var val = '0x0' // default value

    if (cache[watts] == undefined) {
      var pairsVal = utils.toTwoPairsVal(mA)
      val = '0x' + pairsVal
      cache[watts] = val
    } else {
      val = cache[watts]
    }

    send(
      'PoEI2CWrite' +
        ' ' +
        utils.toSlotReg(portNum) +
        ' ' +
        utils.toPortWattsReg(portNum) +
        ' ' +
        val +
        '\n'
    )

    return watts // return watts value
  }
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
