var slotReg = {
  0: '0x30',
  1: '0x31',
  2: '0x32',
  3: '0x33',
  4: '0x34',
  5: '0x35',
  6: '0x36',
  7: '0x37',
  8: '0x38',
  9: '0x39',
  10: '0x3a',
  11: '0x3b'
}

/**
 * transform portNum to slot register number
 * @param {number} portNum
 * @returns {number} slotReg
 * @example toSlotReg(10) // returns 0x34
 *          toSlotReg(13) // returns 0x36
 * @returns {string} slotReg
 */
function toSlotReg(portNum) {
  // in order to provide more memorable UX, allow param to start from 1
  portNum -= 1
  var slotNum = Math.floor(portNum / 2)
  return slotReg[slotNum]
}



