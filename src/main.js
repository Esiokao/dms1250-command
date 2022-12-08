/**
 * @env ES3 / JSscript
 * @author perry@Cameo <https://github.com/Esiokao>
 * @description utility scripts to setup poe-poh
 * @license MIT
 * @version 0.0.1
 */

// dynamic import api modules
eval(Include('apis/reset.js'))
eval(Include('apis/setVoltage.js'))
eval(Include('apis/setClass.js'))
eval(Include('apis/setWatts.js'))
// status control api modules
eval(Include('apis/disableSinglePort.js'))
eval(Include('apis/setupPorts.js'))
eval(Include('apis/setupPortsDirectly.js'))
eval(Include('apis/disableSlot.js'))
eval(Include('apis/enableSlot.js'))
// perform preset Func immediately
eval(Include('apis/presetConfigs.js'))

/**
 * F: V * I = W, 2pairs offset = 20mA
 * scenario: we'd like to acquire 15 watts from PSE Switch w/ class 3 to ports from 1 to 5.
 * usage: setupPorts(3)(15)(1, 5);
 * the function will do the calculations to get the most approximated value by following the formula and write commands via calling apis under the hood.
 * p.s. Voltage is defined as 54V as default PSE output voltage value.
 * p.s.2 我還沒寫防呆跟boundary condition ><.
 *
 */

// entry point
function main() {
  // for single port setup usage, 單獨設定某port
  // usage: setupPorts(class: int)(watts: int|float)(port: int)
  // for multi ports setup usage, 同時設定多ports
  // usage: setupPorts(class: int)(watts: int|float)(portStart: int, portEnd: int)
  setupPorts(4)(20)(1, 4)
 
  // for disable single port usage, 單獨關閉某port
  // usage: disableSinglePort(port: int)

  // for disable slot usage, 單獨關閉slot
  // usage: disableSlot(port: int)
  // disableSlot(1)

  // for enable slot usage, 單獨開啟slot
  // usage: enableSlot(port: int)
  // enableSlot(1)

  // for single port setup usage, 不斷電單獨設定某port
  // usage: setupPortsDirectly(class: int)(watts: int|float)(port: int)
  // for multi ports setup usage, 不斷電同時設定多ports
  // usage: setupPortsDirectly(class: int)(watts: int|float)(portStart: int|float, portEnd: int)
  
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
