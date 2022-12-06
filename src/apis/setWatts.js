eval(Include('apis/send.js'))
eval(Include('apis/sleep.js'))
eval(Include('apis/setClass.js'))
eval(Include('utils/index.js'))

function setWatts(watts, portNum) {
  var cache = {}
  var mA = utils.wattsToTwoPairsAmpere(watts)
  var val

  if (cache[watts] == undefined) {
    val = '0x' + utils.toTwoPairsVal(mA)
    cache[watts] = val
  } else {
    val = '0x' + cache[watts]
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


