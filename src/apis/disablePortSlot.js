eval(Include('apis/send.js'))
eval(Include('utils/index.js'))

/**
 * @param {Number} portNum
 * @example enablePortSlot(10)
 */
function disablePortSlot(portNum) {
  var disableCommand = '0x0'
  send(
    'PoEI2CWrite' +
      ' ' +
      utils.toSlotReg(portNum) +
      ' ' +
      '0x61' +
      ' ' +
      disableCommand +
      '\n'
  )
}
