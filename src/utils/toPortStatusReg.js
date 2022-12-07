var portStatusReg = {
  0: '0x61',
  1: '0x60'
}

/**
 * transform portNum to port status register number
 * @deprecated
 * @param {number} portNum
 * @returns {number} portReg
 * @example toPortStatusReg(10) // returns 0x61
 *          toPortStatusReg(1) // returns 0x60
 * @returns {string} portReg
 */
function toPortStatusReg(portNum) {
  // in order to provide more straightforward UX, allow params number start from 1.
  // 1 + 1 % 2 = 0
  // 2 + 1 % 2 = 1
  portNum = (portNum + 1) % 2
  return portStatusReg[portNum]
}
