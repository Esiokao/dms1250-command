eval(Include('apis/send.js'))
eval(Include('apis/sleep.js'))
eval(Include('utils/index.js'))

function setClass(cl, portNum) {
  var prefix = '0x'
  var classVal = prefix + cl
  send(
    'PoEI2CWrite' +
      ' ' +
      utils.toSlotReg(portNum) +
      ' ' +
      utils.toPortClassReg(portNum) +
      ' ' +
      classVal +
      '\n'
  )
}

