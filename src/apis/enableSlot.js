eval(Include('apis/send.js'))
eval(Include('utils/index.js'))
eval(Include('configs/index.js'))

/**
 * @param {Number} slotNum
 * @example enableSlot(10)
 */
function enableSlot(slotNum) {
  var enableCommand = '0x3'
  send(
    'PoEI2CWrite' +
      ' ' +
      config.slotReg[slotNum] +
      ' ' +
      '0x61' +
      ' ' +
      enableCommand +
      '\n'
  )
}
