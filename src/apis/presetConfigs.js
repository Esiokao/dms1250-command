eval(Include('apis/send.js'))
eval(Include('apis/setVoltage.js'))

function presetConfigs() {
  send('\n')
  setVoltage(54)
  send('\n\n')
}

presetConfigs()

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
