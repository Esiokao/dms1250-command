var portStatusReg = {
  0: '0x60',
  1: '0x61'
}

/**
 * transform portNum to port status register number
 * @param {number} portNum
 * @returns {number} portReg
 * @example toPortStatusReg(10) // returns 0x61
 *          toPortStatusReg(1) // returns 0x60
 * @returns {string} portReg
 */
function toPortStatusReg(portNum) {
  // in order to provide more memorable UX, allow params start from 1
  // 1 + 1 % 2 = 0
  // 2 + 1 % 2 = 1
  portNum = (portNum + 1) % 2
  return portStatusReg[portNum]
}

