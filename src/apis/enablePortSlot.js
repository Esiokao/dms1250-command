eval(Include('apis/send.js'))
eval(Include('utils/index.js'))

/**
 * @param {Number} portNum
 * @example enablePortSlot(10)
 */
function enablePortSlot(portNum) {
  var enableCommand = '0x3'
  send(
    'PoEI2CWrite' +
      ' ' +
      utils.toSlotReg(portNum) +
      ' ' +
      '0x61' +
      ' ' +
      enableCommand +
      '\n'
  )
}
