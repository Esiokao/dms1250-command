/**
 * @env ES3 / JSscript
 * @author perry@Cameo <https://github.com/Esiokao>
 * @description utility scripts to dms1250 cli
 * @license MIT
 * @version 0.0.1
 */

// dynamic import api modules
eval(Include('apis/send.js'))
eval(Include('apis/sleep.js'))
eval(Include('utils/decToHex.js'))
eval(Include('utils/randChar.js'))
eval(Include('utils/randNum.js'))
eval(Include('apis/Initializer.js'))
//-----------------------------------------------

var endl = '\n'

var configs = {
  mac: {
    name: 'EXMAC1',
    id: '6000'
  },
  ipv6: {
    name: 'EXIPV61'
  },
  ip: {
    name: 'EXIP1'
  },
  arpList: {
    name: 'arpList2',
    action: 'Deny'
  },
  dhcp_server_screen: {
    name: 'profile'
  }
}

function acl_mac_config(seqNum, act, macSrc, macDest, ethType, ethMask) {
  // rule 108 permit any any ethernet-type 70A 70A
  var command =
    'rule' +
    ' ' +
    seqNum +
    ' ' +
    act +
    ' ' +
    macSrc +
    ' ' +
    macDest +
    ' ' +
    'ethernet-type' +
    ' ' +
    ethType +
    ' ' +
    ethMask +
    '\n'
  send(command)
}

function mac_access_list_extended(name, number) {
  // mac access-list extended NAME [NUMBER]
  var command = 'mac access-list extended' + ' ' + name + ' ' + number + '\n'
  send(command)
}

function ipv6_access_list_extended(name) {
  // ipv6 access-list [extended] NAME
  var command = 'ipv6 access-list extended' + ' ' + name + '\n'
  send(command)
}

function ipv6_access_list_standard(name) {
  // ipv6 access-list NAME
  var command = 'ipv6 access-list ' + ' ' + name + '\n'
  send(command)
}

function ip_access_list_extended(name) {
  // ip access-list [extended] NAME
  var command = 'ip access-list extended' + ' ' + name + '\n'
  send(command)
}

function ip_access_list_standard(name, number) {
  // ip access-list NAME
  var command 
  if(number === undefined) {
    command = 'ip access-list' + ' ' + name + '\n' 
  } else {
    command = 'ip access-list' + ' ' + name + ' ' + number + '\n'
  }
  send(command)
}

function acl_ipv6_config(seqNum, act, proto, srcIP, destIP) {
  // rule 1 permit tcp any any
  var command =
    'rule' +
    ' ' +
    seqNum +
    ' ' +
    act +
    ' ' +
    proto +
    ' ' +
    srcIP +
    ' ' +
    destIP +
    '\n'
  send(command)
}

function acl_ip_config(seqNum, act, proto, srcIP, destIP) {
  // rule 1 permit tcp any any
  var command =
    'rule' +
    ' ' +
    seqNum +
    ' ' +
    act +
    ' ' +
    proto +
    ' ' +
    srcIP +
    ' ' +
    destIP +
    '\n'
  send(command)
}

function exit(deferTime) {
  var command = 'exit \n'
  send(command, deferTime)
}



function port_security(macAddr, vlan) {
  var command =
    'switchport' +
    ' ' +
    'port-security' +
    ' ' +
    'mac-address' +
    ' ' +
    macAddr +
    ' ' +
    'vlan' +
    ' ' +
    vlan +
    '\n'
  send(command)
}

// function port_security_pipe() {
//   for (var i = 1; i <= 10; i += 1) {
//     interface(i)

//     var five = 0
//     var six = 0
//     var seven = 0
//     var eight = 0

//     for (var j = 1; j <= 33; j += 1) {
//       eight = decToHex(j % 16)
//       seven = decToHex(Math.floor(j / 16))
//       six = decToHex(Math.floor(j / (16 * 8)))
//       five = decToHex(Math.floor(j / (16 * 8 * 8)))

//       var macAddr = '00-00-00-00' + '-' + five + six + '-' + seven + eight

//       port_security(macAddr, i)
//     }

//     exit()
//   }
// }

function radius_server(ip) {
  var command =
    'radius-server host ' +
    ip +
    ' key 0 ' +
    Math.ceil(Math.random() * 1000000) +
    '\n'
  send(command)
}

function tacacs_server(ip) {
  var command =
    'tacacs-server host ' +
    ip +
    ' key 0 ' +
    Math.ceil(Math.random() * 1000000) +
    '\n'
  send(command)
}





// -- generators --------
function macAddr_loop_generator(num, base, step, fn, configs) {
  var prefix = '00-00-00-00'
  if (configs.type === 'multicast') prefix = '01-00-fe-05'

  for (var i = base; i < base + num * step; i += step) {
    eight = decToHex(i % 16)
    seven = decToHex(Math.floor(i / 16) % 16)
    six = decToHex(Math.floor(i / (16 * 8)) % 16)
    five = decToHex(Math.floor(i / (16 * 8 * 8)) % 16)

    var macAddr = prefix + '-' + five + six + '-' + seven + eight

    fn(macAddr, i)
  }
}

function v4_loop_generator(num, base, step, fn, configs) {
  var ipv4
  var first = configs.first ? configs.first : 0
  var second = configs.second ? configs.second : 0
  var third = configs.third ? configs.third : 0
  var fourth = 0
  for (var i = base; i < base + num * step; i += step) {
    _third = Math.floor((i + (third * 256)) / 256)
    _fourth = i % 256
    ipv4 =
      String(first) +
      '.' +
      String(second) +
      '.' +
      String(_third) +
      '.' +
      String(_fourth)

    fn(ipv4, i)
  }
}

function v6_loop_generator(num, base, step, fn, configs) {
  var ipv6
  for (var i = base; i < base + num * step; i += step) {
    var head = configs.head
    var rear = configs.rear
    head = decToHex(head + i)
    ipv6 = String(head) + '::' + String(rear)

    fn(ipv6, i)
  }
}

function random_loop_generator(generator1, generator2) {
  return function (num, step, fn1, fn2) {
    for (var i = 0; i < num; i += step) {
      Math.round(Math.random())
        ? generator1(1, i, step, fn1)
        : generator2(1, i, step, fn2)
    }
  }
}
// -- generators --------

function enter_arp_list(arpListName) {
  // auto create if it doesnt exist
  var command = 'arp access-list ' + arpListName + '\n'
  send(command)
}

function edit_arp_list(act, ipType) {
  enter_arp_list(configs.arpList.name)

  return function ipv4Reciver(ipv4) {
    var command = act + ' ip host ' + ipv4 + ' mac any' + '\n'
    send(command)
  }
}

function authentication(username, password, vlanID) {
  if (vlanID) {
    var command =
      'authentication username ' +
      username +
      ' password 0 ' +
      password +
      ' vlan ' +
      vlanID +
      '\n'
  } else {
    var command =
      'authentication username ' + username + ' password 0 ' + password + '\n'
  }
  send(command)
}

function edit_dhcp_server_screen_profile(profileName) {
  // auto created if doesnt exist

  var command = 'dhcp-server-screen profile ' + profileName + '\n'
  send(command)
}

function dhcp_server_screen(profileName) {
  edit_dhcp_server_screen_profile(profileName)

  return function (macAddr) {
    var command = 'based-on hardware-address ' + macAddr + '\n'
    send(command)
  }
}

function vlan(idStart, idEnd) {
  var command
  if (idEnd) {
    command = 'vlan ' + idStart + '-' + idEnd + '\n'
  } else {
    command = 'vlan ' + idStart + '\n'
  }
  send(command)
}

// will enter into the interface configuration mode after fire this func
function interface(interfaceID) {
  var interfaceName = 'ethernet 1/0/' + interfaceID
  var command = 'interface ' + interfaceName + '\n'
  send(command)
}

// required to entered interface configuration mode first
function config_interface_untagged_vlan_member(vlanIDStart, vlanIDEnd) {
  // switchport hybrid allowed vlan remove 1
  // switchport hybrid allowed vlan add untagged 1-2
  var command = 'switchport hybrid allowed vlan add untagged ' + vlanIDStart + '\n'
  if (vlanIDEnd) {
    command = 'switchport hybrid allowed vlan add untagged ' + vlanIDStart + '-' + vlanIDEnd + '\n'
  }
  send(command)
}

function snmpv1_v2c_group_table(
  groupName,
  readName,
  writeName,
  notifyName,
  stdIPAcessListName
) {
  var version = ['v1', 'v2c']
  var v = version[Math.round(Math.random())]
  var readSyntax = readName === '' ? '' : ' read ' + readName
  var writeSyntax = writeName === '' ? '' : ' write ' + 'writeName'
  var notifySyntax = notifyName === '' ? '' : ' notify ' + notifyName

  var command =
    'snmp group ' +
    groupName +
    ' ' +
    v +
    ' ' +
    readSyntax +
    writeSyntax +
    notifySyntax +
    ' access ' +
    stdIPAcessListName +
    '\n'

  send(command)
}

function snmpv3_group_table(
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
    'snmp group ' +
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

function snmp_user_table(userName, groupName, stdIPAcessListName) {
  var version = 'v1'
  var command =
    'snmp user ' +
    userName +
    ' ' +
    groupName +
    ' ' +
    version +
    ' access ' +
    stdIPAcessListName +
    '\n'
  send(command)
}

function rmon_event(evtIdx, evtDesc) {
  var command = 'rmon event ' + evtIdx + ' description ' + evtDesc + '\n'
  send(command)
}

function rmon_event_log_trap(evtIdx, evtDesc) {
  var command =
    'rmon event ' +
    evtIdx +
    ' log' +
    ' trap 123' +
    ' owner 123' +
    ' description ' +
    evtDesc +
    '\n'
  send(command)
}

function rmon_alarm(
  alarmIdx,
  intervel,
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
    intervel +
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

function fdb_static_unicast(macAddr, vlanID, interfaceID) {
  var command = 'mac-address-table static ' + macAddr + ' vlan ' + vlanID + ' interface ' + interfaceID + '\n'
  send(command)
}

function ipv6_mld_group(ipv6Addr, interfaceID) {
  var command = 'ipv6 mld snooping static-group ' + ipv6Addr + ' interface ' + interfaceID + '\n'
  send(command)
}

// requried to enter vlan configuration mode first
function igmp_snooping(groupAddr, interfaceID) { // interfaceID requried preprocess
  var command = 'ip igmp snooping static-group ' + groupAddr + ' interface ' + interfaceID + '\n'
  send(command)
}

function arp_static(ipv4Addr, macAddr) {
  var command = 'arp ' + ipv4Addr + ' ' + macAddr + '\n'
  send(command)
}

function arp_staitc_route(networkAddr, mask, gateway) {
  var command = 'ip route ' + networkAddr + ' ' + mask + ' ' + gateway + '\n'
  send(command)
}

function ipv6_neighbor(ipv6Addr, vlanID, macAddr) {
  var command = 'ipv6 neighbor ' + ipv6Addr + ' ' + vlanID + ' ' + macAddr + '\n'
  send(command)
}

function ipv6_static_route(networkPrefix, prefixLength, vlanID) {
  var networkWithPrefix = networkPrefix + '/' + prefixLength
  var command = 'ipv6 route ' +  networkWithPrefix + ' vlan ' + vlanID + ' FE80::1' + '\n'
  send(command) 
}

// -- utils start------------------
function pipeLine(num, base, step) {
  return function () {
    for (var i = base; i < base + num * step; i += step) {
      for (var j = 0; j < arguments.length; j += 1) {
        // only takes function as param
        arguments[j]()
      }
    }
  }
}



function defer(fn) {
  return function () {
    fn.apply(null, arguments)
  }
}

function loop(num, base, step, callbackFunc) {
  for (var i = base; i < base + num * step; i += step) {
    callbackFunc(i)
  }
}

function login_fail(acc, pwd) {
  send(acc + '\n')
  send(pwd + '\n')
}

function genRand() {
  return Math.round(Math.random())
}

function randX(min, max, expectsArr) {
  var result = Math.floor(Math.random() * (max - min) + min)
  var exist = false
  for (var i = 0; i < expectsArr.length; i += 1) {
    if (expectsArr[i] === result) exist = true
  }
  if (exist) return randX(min, max, expects)
  return result
}

//-- entry point --------
function main() {
  var initializer = new Initializer()
  // initializer.http()
  initializer.https()

  // var igmp_snooping_pipeline  = function pre(vlanID) {
  //   vlan(vlanID)
  //   return function(groupAddr, index) {
  //     var interfaceID = 'ethernet 1/0/' + ((index % 10)+1)
  //     igmp_snooping(groupAddr, interfaceID)
  //   }
  // }

  // var ipv6_mld_group_pipeline = function pre(vlanID) {
  //   vlan(vlanID)
  //   return function (groupAddr, index) {
  //     var interfaceID = 'ethernet 1/0/' + ((index % 10) + 1)
  //     ipv6_mld_group(groupAddr, interfaceID)
  //   }
  // }

  // // v4_loop_generator(257, 1, 1, igmp_snooping_pipeline(1), {first: 224, second: 0, third: 1})
  // v6_loop_generator(129, 1, 1, ipv6_mld_group_pipeline(1), { first: 65284, rear: 1 })

  // function arp_static_pipeline(num, start, step) {
  //   loop(num, start, step, function (index) {
  //     var _index = index
  //     v4_loop_generator(1, _index, 1, function (ipv4Addr, _index) {
  //       macAddr_loop_generator(1, _index, 1, function (macAddr, _index) {
  //         arp_static(ipv4Addr, macAddr)
  //       }, {type: 'unicast'})
  //     }, {first: 10, second: 90})
  //   })
  // }

  // arp_static_pipeline(769, 1, 1)

  function arp_staitc_route_pipeline(num, start, step) {
    loop(num, start, step, function (index) {
      var _index = index
      var mask = '255.255.255.255'
      v4_loop_generator(1, _index, 1, function (networkAddr, index) {
        v4_loop_generator(1, _index, 1, function (gateway, index) {
          arp_staitc_route(networkAddr, mask, gateway)
        }, { first: 192, second: 168, third: 0 })
      }, {
        first: 10,
        second: 90,
        third: 90
      })
    })
  }

  // arp_staitc_route_pipeline(129, 1, 1)

  // function ipv6_neighbor_pipeline(num, start, step) {
  //   loop(num, start, step, function (index) {
  //     var _index = index
  //     var vlanID = 'vlan1'
  //     v6_loop_generator(1, _index, 1, function(ipv6Addr) {
  //       macAddr_loop_generator(1, _index, 1, function(macAddr){
  //         ipv6_neighbor(ipv6Addr, vlanID, macAddr)
  //       }, {})
  //     }, {head: 8192, rear: 1})
  //   })
  // }

  // ipv6_neighbor_pipeline(129, 1, 1)

  // var ipv6_static_route_pipeline = function(prefixLength, vlanID){
  //   v6_loop_generator(65, 1, 1, function(ipv6Addr, index){
  //     ipv6_static_route(ipv6Addr, prefixLength, vlanID)
  //   }, {head: 8192, rear: 1})
  // }

  // ipv6_static_route_pipeline(64, 1)

  function pipe1 () {
    loop(51, 1, 1, function(index){
      var name = 'st' + index
      ip_access_list_standard(name, index)
      exit()
    })
  }

  pipe1()
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
