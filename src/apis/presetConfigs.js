eval(Include('apis/send.js'))
eval(Include('apis/setVoltage.js'))


function presetConfigs() {
  setVoltage(53)
  send('\n')
}


