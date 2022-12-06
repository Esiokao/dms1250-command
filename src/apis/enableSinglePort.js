eval(Include('apis/send.js'))
eval(Include('utils/index.js'))

/**
 * @param {Number} portNum
 * @example enableSinglePort(10)
 */
function enableSinglePort(portNum) {
  var enableCommand = utils.toPortStatusVal(1)(portNum)
  send(
    'PoEI2CWrite' +
      ' ' +
      utils.toSlotReg(portNum) +
      ' ' +
      // utils.toPortStatusReg(portNum) +
      '0x61' +
      ' ' +
      enableCommand +
      '\n'
  )
}


