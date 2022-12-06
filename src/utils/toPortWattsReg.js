var portWattsReg = {
  0: '0x80',
  1: '0x81'
}

/**
 * transform portNum to port Watts register number
 * @param {number} portNum
 * @example toPortWattsReg(10) // returns 0x81
 *          toPortWattsReg(1) // returns 0x80
 * @returns {string} portReg
 */
function toPortWattsReg(portNum) {
  // in order to provide more memorable UX, allow params start from 1
  // 1 + 1 % 2 = 0
  // 2 + 1 % 2 = 1
  portNum = (portNum + 1) % 2
  return portWattsReg[portNum]
}

