eval(Include('apis/send.js'))
eval(Include('utils/index.js'))

/**
 * hardware doesn't support single port status ctrl, when user call this api on port 6,
 * it would lead the port 5 to be shutdown unexpectedly. hence, this func wouldn't provide to user.
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

// This subroutine must be pasted into any JScript that calls 'Include'.
// NOTE: you may need to update your script engines and scripting runtime
// in order to successfully create the 'Scripting.FileSystemObject'.
//
function Include(file) {
  var fso, f
  fso = new ActiveXObject('Scripting.FileSystemObject')
  f = fso.OpenTextFile(file, 1)
  str = f.ReadAll()
  f.Close()
  return str
}
