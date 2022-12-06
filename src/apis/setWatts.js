eval(Include('apis/send.js'))
eval(Include('apis/sleep.js'))
eval(Include('apis/setClass.js'))
eval(Include('utils/index.js'))

var cache = {}

function setWatts(watts, portNum) {
  var mA = utils.wattsToTwoPairsAmpere(watts)
  var val = '0x0'

  if (cache[watts] == undefined) {
    var pairsVal = utils.toTwoPairsVal(mA)
    val = '0x' + pairsVal
    cache[watts] = val 
  } else {
    val =  cache[watts]
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


