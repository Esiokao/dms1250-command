eval(Include('apis/setClass.js'))
eval(Include('apis/setWatts.js'))
eval(Include('apis/disable4Pairs.js'))
eval(Include('apis/disableSinglePort.js'))
eval(Include('apis/enableSinglePort.js'))
eval(Include('apis/enablePortSlot.js'))

function setupPortsDirectly(cl) {
  return function wattsReceiver(watts) {
    return function portsReceiver(portNum, portEnd) {
      var multi = portEnd ? true : false
      portEnd = portEnd == undefined ? portNum : portEnd
      // NOTE: setup w/o disable/enable
      while (portNum <= portEnd) {
        
        setClass(cl)(portNum)
        setWatts(watts)(portNum)
        enablePortSlot(portNum)
        // to avoid situation that when setting ports from 1 to 5, but get activated on port 6,
        // need to do additional check.
        // cuz there's no status ctrl register for just one single port. kinda weird but truth =_=...
        portNum += 1
      }
    }
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
