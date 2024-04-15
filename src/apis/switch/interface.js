eval(Include('apis/send.js'))

// will enter into the interface configuration mode after fire this func
function interface(startInterface, endInterface) {
  var interfaceID
  // single interface
  if (endInterface == undefined)
    interfaceID = 'ethernet 1/0/' + startInterface
  // multi interface
  interfaceID = 'range ethernet 1/0/' + startInterface + '-' + endInterface
  var command = 'interface ' + interfaceID + '\n'
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
