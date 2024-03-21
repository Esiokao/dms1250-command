eval(Include('apis/send.js'))
eval(Include('utils/randChar.js'))
eval(Include('utils/randNum.js'))

function Snmp() {
  // snmp-server view VIEW-NAME OID-TREE {included | excluded}
  this.add_snmp_view = function () {
    var viewName = randChar(32)
    var oidTree = '1.3.1.2.10.' + randNum(1)
    var included = 'included'

    var command =
      'snmp-server' +
      ' ' +
      'view' +
      ' ' +
      viewName +
      ' ' +
      oidTree +
      ' ' +
      included +
      '\n'

    send(command)
  }

  // snmp-server community [0 | 7] COMMUNITY-STRING [view VIEW-NAME] [ro | rw] [access IP-ACL-NAME]
  // max-entry = 10
  this.add_snmp_community = function () {
    var communityName = randChar(32)
    var viewName = randChar(32)
    var accessRight = 'ro'

    var command =
      'snmp-server' +
      ' ' +
      'community' +
      ' ' +
      communityName +
      ' ' +
      'view' +
      ' ' +
      viewName +
      ' ' +
      accessRight +
      '\n'

    send(command)
  }

  // snmp-server group GROUP-NAME {v1 | v2c | v3 {auth | noauth | priv}} [read READ-VIEW] [write WRITE-VIEW] [notify NOTIFY-VIEW] [access IP-ACL-NAME]

  this.add_snmp_v1_v2c_group_table = function (
    groupName,
    readName,
    writeName,
    notifyName,
    stdIPAcessListName
  ) {
    var version = ['v1', 'v2c']
    var v = version[Math.round(Math.random())]
    var readSyntax = readName === '' ? '' : ' read ' + readName
    var writeSyntax = writeName === '' ? '' : ' write ' + writeName
    var notifySyntax = notifyName === '' ? '' : ' notify ' + notifyName
    var stdIPAcessListSyntax = stdIPAcessListName
      ? ''
      : ' access ' + stdIPAcessListName
    var command =
      'snmp-server group ' +
      groupName +
      ' ' +
      v +
      ' ' +
      readSyntax +
      writeSyntax +
      notifySyntax +
      '\n'

    send(command)
  }

  this.add_snmp_v3_group_table = function (
    groupName,
    readName,
    writeName,
    notifyName,
    stdIPAcessListName
  ) {
    var version = 'v3'
    var secLvlArr = ['auth', 'noauth', 'priv']
    var secLvl = secLvlArr[randNum(1) % 3]
    var readSyntax = readName === '' ? '' : ' read ' + readName
    var writeSyntax = writeName === '' ? '' : ' write ' + 'writeName'
    var notifySyntax = notifyName === '' ? '' : ' notify ' + notifyName

    var command =
      'snmp-server group ' +
      groupName +
      ' ' +
      version +
      ' ' +
      secLvl +
      ' ' +
      readSyntax +
      writeSyntax +
      notifySyntax +
      ' access ' +
      stdIPAcessListName +
      '\n'

    send(command)
  }

  // snmp-server user USER-NAME  GROUP-NAME {v1 | v2c | v3 [key auth {md5 | sha} AUTH-KEY  [priv PRIV-KEY]] [password auth {md5 | sha} AUTH-PASSWORD [priv PRIV-PASSWORD]]} [access IP-ACL-NAME]

  this.add_snmp_user_table = function (
    userName,
    groupName,
    stdIPAcessListName
  ) {
    var version = 'v1'
    var stdIPAccessListSyntax =
      stdIPAcessListName == undefined ? '' : ' access ' + stdIPAcessListName

    var command =
      'snmp-server user ' +
      userName +
      ' ' +
      groupName +
      ' ' +
      version +
      stdIPAccessListSyntax +
      '\n'
    send(command)
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
