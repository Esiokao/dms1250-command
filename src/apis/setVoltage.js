eval(Include('apis/send.js'))
eval(Include('apis/sleep.js'))
eval(Include('utils/index.js'))

function setVoltage(voltage) {
  voltage = voltage == undefined ? 54 : voltage // given a default value
  send('PseOutputVoltage' + ' ' + voltage + '\n')
}


