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



// entry point
function main() {
  send('\n')
  // disable4Pairs(13)
  setupPorts(4)(13)(1, 24)
  // setVoltage()
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
