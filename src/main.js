/**
 * @env ES3 or JSscript
 * @author perry <Perry_Kao@cameo.com.tw>
 * @description utility scripts to setup poe-poh
 * @license MIT
 */

// static import modules
eval(Include('apis/disableSinglePort.js'))
eval(Include('apis/enableSinglePort.js'))
eval(Include('apis/setVoltage.js'))
eval(Include('apis/setClass.js'))
eval(Include('apis/setWatts.js'))
eval(Include('apis/setupPorts.js'))
eval(Include('apis/disableSlot.js'))
eval(Include('apis/enableSlot.js'))
// perform preset Func immediately
eval(Include('apis/presetConfigs.js'))


// V * I = W, 2pairs offset = 20mA
// scenario1: we'd like to acquire 15 watts from PSE Switch w/ class 3 to ports 1 to 4.
// syntax: setupPorts(3)(15)(1, 4);
// the apis will do the calculations to get the most approximate value by following the formula via apis.
// p.s. Voltage is defined as 54V as default PSEoutputVoltage.
// p.s.2 我還沒寫防呆跟boundary condition, 我真ㄉ好懶.

function main() {
  // entry point
  // for single port setup
  // setupPorts(class: int)(watts: int)(port: int)
  // for multi ports setup
  // setupPorts(class: int)(watts: int)(portStart: int, portEnd: int)
  setupPorts(3)(14)(1, 2)
  // for disable single port
  // disableSinglePort(port: int)
  disableSlot(8)
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
