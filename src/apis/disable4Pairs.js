eval(Include('apis/send.js'))
eval(Include('utils/index.js'))

function disable4Pairs(portNum) {
  var disableCommand = '0x0'
  var fourPairsReg = '0x60'
  send(
    'PoEI2CWrite' +
      ' ' +
      utils.toSlotReg(portNum) +
      ' ' +
      fourPairsReg +
      ' ' +
      disableCommand +
      '\n'
  )
}
