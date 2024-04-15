eval(Include('apis/send.js'))
eval(Include('utils/command.js'))
eval(Include('apis/switch/interface.js'))
eval(Include('apis/switch/exit.js'))

// "mac-address-table static MAC-ADDR vlan VLAN-ID {{INTERFACE-ID [, | -] | port-channel <1-8>}| drop}"
function Fdb() {
  this.add_static_unicast = function (macAddr, vlanID, interfaceID) {
    var cmd =
      'mac-address-table static ' +
      macAddr +
      ' vlan ' +
      vlanID +
      ' interface ' +
      interfaceID +
      '\n'

    send(cmd)
  }
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
