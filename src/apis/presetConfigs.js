eval(Include('apis/send.js'))
eval(Include('apis/setVoltage.js'))


function presetConfigs() {
  send('\n')
  setVoltage(54)
  send('\n')
  send('\n')
}

presetConfigs()


