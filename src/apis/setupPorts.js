eval(Include('apis/setClass.js'))
eval(Include('apis/setWatts.js'))
eval(Include('apis/disable4Pairs.js'))
eval(Include('apis/disableSinglePort.js'))
eval(Include('apis/enableSinglePort.js'))
eval(Include('apis/enableSlot.js'))

function setupPorts(cl) {
  return function wattsReceiver(watts) {
    return function portsReceiver(portNum, portEnd) {
      if (portEnd == undefined) portEnd = portNum
      for (portNum; portNum <= portEnd; portNum += 1) {
        disable4Pairs(portNum)
        disableSinglePort(portNum)
        setClass(cl, portNum)
        setWatts(watts, portNum)
        // to avoid situation that when setting ports from 1 to 5, but get activated on port 6.
        // cuz there's no status ctrl reg for just one single port. kinda weird but truth =_=...
        portNum % 2 == 0 ? enableSinglePort(portNum) : enablePortSlot(portNum)
      }
    }
  }
}
