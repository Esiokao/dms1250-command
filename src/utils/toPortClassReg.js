var portClassReg = {
  0: '0x91',
  1: '0x90'
}

/**
 * transform portNum to port Class register number
 * @param {number} portNum
 * @example toPortClassReg(10) // returns 0x91
 *          toPortClassReg(1) // returns 0x90
 * @returns {string} portReg
 */
function toPortClassReg(portNum) {
  // in order to provide more memorable UX, allow params start from 1
  // 1 + 1 % 2 = 0
  // 2 + 1 % 2 = 1
  portNum = (portNum + 1) % 2
  return portClassReg[portNum]
}

