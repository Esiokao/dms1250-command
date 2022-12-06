eval(Include('apis/setClass.js'))
eval(Include('apis/setWatts.js'))
eval(Include('apis/disable4Pairs.js'))
eval(Include('apis/disableSinglePort.js'))
eval(Include('apis/enablePortSlot.js'))

function setupPorts(cl) {
  return function wattsReceiver(watts) {
    return function portsReceiver(portNum, portEnd) {
      if(portEnd == undefined) portEnd = portNum
      for (portNum; portNum <= portEnd; portNum += 1) {
        disableSinglePort(portNum)
        disable4Pairs(portNum)
        setClass(cl, portNum)
        setWatts(watts, portNum)
        enablePortSlot(portNum)
      }
    }
  }
}
