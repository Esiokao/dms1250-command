eval(Include('apis/send.js'))

var portStatusVal = {
  enable: {
    0: '0x1',
    1: '0x2'
  },
  disable: {
    0: '0x2',
    1: '0x1'
  }
}

function toPortStatusVal(status) {
  status = status == 0 ? 'disable' : 'enable'

  return function portNumReceiver(portNum) {
    // in order to provide more memorable UX, allow params start from 1
    // 1 + 1 % 2 = 0
    // 2 + 1 % 2 = 1
    portNum = (portNum + 1) % 2

    return portStatusVal[status][portNum]
  }
}
