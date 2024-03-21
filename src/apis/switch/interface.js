eval(Include('apis/send.js'))

// will enter into the interface configuration mode after fire this func
function interface(interfaceID) {
  var interfaceName = 'ethernet 1/0/' + interfaceID
  var command = 'interface ' + interfaceName + '\n'
  send(command)
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
