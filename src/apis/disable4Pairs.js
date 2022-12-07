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
