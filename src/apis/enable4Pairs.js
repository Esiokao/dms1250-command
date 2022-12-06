eval(Include('apis/send.js'))
eval(Include('utils/index.js'))

function enable4Paris(portNum) {
  var enableCommand = '0x1'
  send(
    'PoEI2CWrite' + ' ' + utils.toSlotReg(portNum) + ' ' + enableCommand + '\n'
  )
}
