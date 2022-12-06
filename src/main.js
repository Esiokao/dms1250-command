/**
 * @env ES3 / JSscript
 * @author perry <Perry_Kao@cameo.com.tw>
 * @description utility scripts to setup poe-poh
 * @license MIT
 */

// dynamic import api modules
eval(Include('apis/reset.js'))
eval(Include('apis/setVoltage.js'))
eval(Include('apis/setClass.js'))
eval(Include('apis/setWatts.js'))
eval(Include('apis/disableSinglePort.js'))
eval(Include('apis/enableSinglePort.js'))
eval(Include('apis/setupPorts.js'))
eval(Include('apis/disableSlot.js'))
eval(Include('apis/enableSlot.js'))

eval(Include('apis/presetConfigs.js')) // perform preset Func immediately

/**
 * 
 * F: V * I = W, 2pairs offset = 20mA
 * scenario1: we'd like to acquire 15 watts from PSE Switch w/ class 3 to ports 1 to 4.
 * syntax: setupPorts(3)(15)(1, 4);
 * function will do the calculations to get the most approximate value and write commands by following the formula via apis under the hood.
 * p.s. Voltage is defined as 54V as default PSE outputVoltage.
 * p.s.2 我還沒寫防呆跟boundary condition, 請原諒我ㄉ懶惰(つ´ω`)つ.
 */

// entry point
function main() {
  // for single port setup usage 單獨設定某port
  // syntax: setupPorts(class: int)(watts: int|float)(port: int)
  // for multi ports setup usage 同時設定多ports
  // syntax: setupPorts(class: int)(watts: int)(portStart: int|float, portEnd: int)
  setupPorts(4)(20)(2)
  setupPorts(4)(20)(3)
  setupPorts(4)(20)(4)
  setupPorts(4)(21)(1)
  setupPorts(3)(19)(5)
  disableSinglePort(1)
  

  // for disable single port usage, 單獨關閉某port
  // syntax: disableSinglePort(port: int)


  // for disable slot usage, 單獨關閉slot
  // syntax: disableSlot(port: int)


  // for enable single port usage, 開啟單一port
  // syntax: enableSinglePort(port: int)


  // for enable slot usage, 開啟slot
  // syntax: enableSlot(port: int)

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
