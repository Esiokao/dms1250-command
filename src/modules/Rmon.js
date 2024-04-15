eval(Include('apis/send.js'))
eval(Include('utils/command.js'))
eval(Include('apis/switch/interface.js'))
eval(Include('apis/switch/exit.js'))

function Rmon(ports) {
  // attrs
  this.totalPorts = ports

  // snmp-server enable traps rmon [rising-alarm | falling-alarm]
  // no snmp-server enable traps rmon [rising-alarm | falling-alarm]
  this.enable = function (enable) {
    var command
    if (!enable) command = 'no snmp-server enable traps rmon' + '\n'
    else command = 'snmp-server enable traps rmon' + '\n'
    send(command)
  }

  // Interface Configuration Mode
  // rmon collection stats INDEX [owner NAME]
  // each port can only bind with one specify index
  this.add_stat = function (index, ownerName) {
    var command
    var pre = 'rmon collection stats '
    if (!ownerName) command = pre + index + '\n'
    else command = pre + index + ' owner ' + ownerName + '\n'
    send(command)
  }

  // Interface Configuration Mode
  // no rmon collection stats INDEX
  this.remove_stat = function (index) {
    var command = 'no rmon collection stats ' + index + '\n'
    send(command)
  }

  // Interface Configuration Mode
  // rmon collection history INDEX [owner NAME] [buckets NUM] [interval SECONDS]
  // each port can only bind with one specify index
  this.add_history = function (index, ownerName, bucketsNum, intervalSec) {
    var pre = 'rmon collection history ' + index
    var ownerSyntax = ownerName == undefined ? '' : 'owner ' + ownerName
    var bucketsSyntax = bucketsNum == undefined ? '' : 'buckets ' + bucketsNum
    var intervalSyntax =
      intervalSec == undefined ? '' : 'interval ' + intervalSec
    var cmd = command([pre, ownerSyntax, bucketsSyntax, intervalSyntax])
    send(cmd)
  }

  this.add_rmon_event = function (evtIdx, evtDesc) {
    var command = 'rmon event ' + evtIdx + ' description ' + evtDesc + '\n'
    send(command)
  }
  // rmon event INDEX [log] [trap COMMUNITY] [owner NAME] [description TEXT]

  this.add_event_log_trap = function (evtIdx, evtDesc) {
    var cmd = command([
      'rmon event ',
      evtIdx
      // ' log',
      // ' trap 123',
      // 'owner 132',
      // ' desc ' + evtDesc
    ])
    send(cmd)
  }

  // "rmon alarm INDEX VARIABLE INTERVAL {delta | absolute} rising-threshold VALUE [RISING-EVENT-NUMBER] falling-threshold VALUE [FALLING-EVENT-NUMBER] [owner STRING]"

  this.add_rmon_alarm_table = function (
    alarmIdx,
    interval,
    sampleType,
    risingThresholdEvtVal,
    risingThresholdEvtNum,
    fallingThresholdVal,
    fallingThresholdEvtNum
  ) {
    var x = 11
    var y = 8
    var variable = '1.3.6.1.2.1.2.2.1' + '.' + String(x) + '.' + String(y)
    if (risingThresholdEvtVal < fallingThresholdVal) {
      var tmp = risingThresholdEvtVal
      risingThresholdEvtVal = fallingThresholdVal
      fallingThresholdVal = tmp
    }
    var command =
      'rmon alarm ' +
      alarmIdx +
      ' ' +
      variable +
      ' ' +
      interval +
      ' ' +
      sampleType +
      ' rising-threshold ' +
      risingThresholdEvtVal +
      ' ' +
      risingThresholdEvtNum +
      ' falling-threshold ' +
      fallingThresholdVal +
      ' ' +
      fallingThresholdEvtNum +
      '\n'
    send(command)
  }

  this.enterInterfaceThenExit = function (interfaceID, cb) {
    this.interface(interfaceID)
    cb()
    this.exit()
  }
  this.interface = function (interfaceID) {
    interface(interfaceID)
  }

  this.exit = function () {
    exit()
  }
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
