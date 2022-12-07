eval(Include('apis/send.js'))
eval(Include('utils/index.js'))
eval(Include('configs/index.js'))

/**
 * @param {Number} slotNum
 * @example enableSlot(10)
 */
function disableSlot(slotNum) {
  var disableCommand = '0x0'
  send(
    'PoEI2CWrite' +
      ' ' +
      config.slotReg[slotNum] +
      ' ' +
      '0x61' +
      ' ' +
      disableCommand +
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