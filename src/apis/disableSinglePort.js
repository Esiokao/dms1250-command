eval(Include('apis/send.js'))
eval(Include('utils/index.js'))

/**
 * @param {Number} portNum
 * @example disableSinglePort(10)
 */
function disableSinglePort(portNum) {
  var disableCommand = utils.toPortStatusVal(0)(portNum)
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
