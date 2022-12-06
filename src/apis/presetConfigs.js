eval(Include('apis/send.js'))
eval(Include('apis/setVoltage.js'))


function presetConfigs() {
  setVoltage(54)
  send('\n')
}

presetConfigs()


