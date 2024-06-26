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
eval(Include('apis/switch/interface.js'))
eval(Include('apis/switch/exit.js'))
eval(Include('utils/decToHex.js'))
eval(Include('utils/randChar.js'))
eval(Include('utils/randNum.js'))
eval(Include('utils/randX.js'))
eval(Include('utils/randInteger.js'))
eval(Include('modules/Initializer.js'))
eval(Include('modules/Snmp.js'))
eval(Include('modules/Rmon.js'))
eval(Include('modules/Fdb.js'))
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
  // rule 108 permit macSrc any ethernet-type 70A 70A
  var command =
    'rule' +
    ' ' +
    seqNum +
    ' ' +
    act +
    ' ' +
    'host ' +
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
  if (number === undefined)
    command = 'mac access-list extended' + ' ' + name + '\n'
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
  if (number === undefined) {
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
    _third = Math.floor((i + third * 256) / 256)
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

// create vlan if vlanID doesn't exist
// then enter into the specified vlan configuration mode.
function vlan(idStart, idEnd) {
  var command
  if (idEnd) {
    command = 'vlan ' + idStart + '-' + idEnd + '\n'
  } else {
    command = 'vlan ' + idStart + '\n'
  }
  send(command)
}

// required to entered interface configuration mode first
function config_interface_untagged_vlan_member(vlanIDStart, vlanIDEnd) {
  // switchport hybrid allowed vlan remove 1
  // switchport hybrid allowed vlan add untagged 1-2
  var command =
    'switchport hybrid allowed vlan add untagged ' + vlanIDStart + '\n'
  if (vlanIDEnd) {
    command =
      'switchport hybrid allowed vlan add untagged ' +
      vlanIDStart +
      '-' +
      vlanIDEnd +
      '\n'
  }
  send(command)
}

function ipv6_mld_group(ipv6Addr, interfaceID) {
  var command =
    'ipv6 mld snooping static-group ' +
    ipv6Addr +
    ' interface ' +
    interfaceID +
    '\n'
  send(command)
}

// requried to enter vlan configuration mode first
function igmp_snooping(groupAddr, interfaceID) {
  // interfaceID requried preprocess
  var command =
    'ip igmp snooping static-group ' +
    groupAddr +
    ' interface ' +
    interfaceID +
    '\n'
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
  var command =
    'ipv6 neighbor ' + ipv6Addr + ' ' + vlanID + ' ' + macAddr + '\n'
  send(command)
}

function ipv6_static_route(networkPrefix, prefixLength, vlanID) {
  var networkWithPrefix = networkPrefix + '/' + prefixLength
  var command =
    'ipv6 route ' + networkWithPrefix + ' vlan ' + vlanID + ' FE80::1' + '\n'
  send(command)
}

function voice_vlan(macAddr, desc) {
  var command =
    'voice vlan mac-address ' +
    macAddr +
    ' FF-FF-FF-00-00-00 description ' +
    desc +
    '\n'
  send(command)
}

function dhcp_snooping(state) {
  // ip dhcp snooping
  var command = 'ip dhcp snooping' + '\n'
  if (state === 'disable') command = 'no ip dhcp snooping' + '\n'
  send(command, 300)
}

function dhcp_snooping_trust(state) {
  // ip dhcp snooping
  var command = 'ip dhcp snooping trust' + '\n'
  if (state === 'disable') command = 'no ip dhcp snooping trust' + '\n'
  send(command, 300)
}

function dhcp_snooping_vlan(vlanID) {
  // ip dhcp snooping vlan 1
  var command = 'ip dhcp snooping vlan ' + vlanID + '\n'
  send(command)
}

/** 
  required: dhcp snooping vlan existed, global state is enabled, interface is untrust
*/
function dhcp_snooping_binging(
  macAddr,
  vlanID,
  ipAddr,
  interfaceID,
  expirySeconds
) {
  // ip dhcp snooping binding MAC-ADDR vlan VLAN-ID IP-ADDRESS  interface {<INTERFACE-ID> | port-channel <1-8>} expiry SECONDS
  var command =
    'ip dhcp snooping binding ' +
    macAddr +
    ' vlan ' +
    vlanID +
    ' ' +
    ipAddr +
    ' interface ' +
    interfaceID +
    ' expiry ' +
    expirySeconds +
    '\n'
  send(command, 300)
}

// -- utils start------------------
function pipeLine(num, base, step) {
  return function () {
    for (var i = base; i < base + num * step; i += step) {
      for (var j = 0; j < arguments.length; j += 1) {
        // only takes function as argv
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

//-- entry point --------
function main() {
  var initializer = new Initializer()
  initializer.clear().login().http().init()

  // --snmp -----
  // var snmp = new Snmp()
  // loop(50, 1, 1, snmp.add_snmp_view)
  // loop(10, 1, 1, defer(snmp.add_snmp_community))
  // var snmpAddv1Pipe = function (index) {
  //   snmp.add_snmp_v1_v2c_group_table(
  //     randChar(32),
  //     randChar(32),
  //     randChar(32),
  //     randChar(32)
  //   )
  // }
  // loop(50, 1, 1, snmpAddv1Pipe)
  // var snmpAddUserPipe = function (index) {
  //   snmp.add_snmp_user_table(randChar(32), 'public')
  // }

  // loop(50, 1, 1, snmpAddUserPipe)

  // --rmon -----
  var rmon = new Rmon(10)
  rmon.enable(true)

  var addRmonStatPipe = function (index) {
    index = index > rmon.totalPorts ? rmon.totalPorts : index
    rmon.interface(index)
    rmon.add_stat(randInteger(1, 63335), randChar(127))
    rmon.exit()
  }

  // loop(11, 1, 1, addRmonStatPipe)
  function addHistory() {
    var addHistoryPipe = function (index) {
      index = index > rmon.totalPorts ? randInteger(1, rmon.totalPorts) : index
      rmon.enterInterfaceThenExit(index, function () {
        rmon.add_history(
          randInteger(1, 63335),
          randChar(127),
          randInteger(1, 50),
          randInteger(1, 3600)
        )
      })
    }

    loop(11, 1, 1, addHistoryPipe)
  }

  // addHistory()

  function addEvent() {
    var addEventPipe = function (index) {
      index = index > rmon.totalPorts ? rmon.totalPorts : index
      // possibly considered an issue, exit interface configuration mode after configured rmon event
      // rmon.enterInterfaceThenExit(index, function () {
      //   rmon.add_event_log_trap(index, randChar(127))
      // })
      rmon.interface(index)
      rmon.add_event_log_trap(index, randChar(127))
    }

    loop(10, 1, 1, addEventPipe)
  }

  // addEvent()

  function addAlarm() {
    var addAlarmPipe = function (index) {
      var alarmIndex = randInteger(1, 65535)
      index = index > rmon.totalPorts ? randInteger(1, rmon.totalPorts) : index
      rmon.add_rmon_alarm_table(
        alarmIndex,
        index,
        'absolute',
        20,
        10,
        index,
        index
      )
    }
    loop(5, 1, 1, addAlarmPipe)
  }

  // addAlarm()

  // fdb
  var fdb = new Fdb()
  function addStaticFdb() {
    macAddr_loop_generator(
      200,
      1,
      1,
      function (macAddr, idx) {
        vlan(idx)
        interface(1, 8)
        config_interface_untagged_vlan_member(idx)
        exit()
        fdb.add_static_unicast(
          macAddr,
          idx,
          'ethernet 1/0/' + randInteger(1, 8)
        )
      },
      { type: 'unicast' }
    )
    macAddr_loop_generator(
      200,
      1,
      1,
      function (macAddr, idx) {
        vlan(idx)
        interface(1, 8)
        config_interface_untagged_vlan_member(idx)
        exit()
        fdb.add_static_unicast(
          macAddr,
          idx,
          'ethernet 1/0/' + randInteger(1, 8)
        )
      },
      { type: 'multicast' }
    )
  }

  // addStaticFdb()

  function createVlan() {
    loop(4093, 2, 1, function (idx) {
      vlan(idx)
      interface(1, 8)
      config_interface_untagged_vlan_member(idx)
      exit()
    })
  }

  createVlan()
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
      v4_loop_generator(
        1,
        _index,
        1,
        function (networkAddr, index) {
          v4_loop_generator(
            1,
            _index,
            1,
            function (gateway, index) {
              arp_staitc_route(networkAddr, mask, gateway)
            },
            { first: 192, second: 168, third: 0 }
          )
        },
        {
          first: 10,
          second: 90,
          third: 90
        }
      )
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

  function pipe1() {
    loop(51, 1, 1, function (index) {
      var name = 'st' + index
      ip_access_list_standard(name, index)
      exit()
    })
  }

  // pipe1()

  // FIXME: got unexecpted value in macAddr
  function voice_vlan_pipe() {
    return function (index) {
      var one = decToHex(randX(1, 17)) + 4
      var two = decToHex(randX(1, 17)) + decToHex(randX(1, 17))
      var three = decToHex(randX(1, 17)) + decToHex(randX(1, 17))
      var macAddr = one + '-' + two + '-' + three + '-00-00-00'
      voice_vlan(macAddr, randChar(3))
    }
  }

  // loop(50, 1, 1, voice_vlan_pipe())

  function acl_pipe() {
    var aclName = 'name1'

    ip_access_list_standard(aclName)

    v4_loop_generator(
      769,
      1,
      1,
      function (ipAddr, index) {
        acl_ip_config(index, 'permit', 'host', ipAddr, 'any')
      },
      {
        first: 0,
        second: 0,
        third: 0
      }
    )
  }

  // acl_pipe()

  function acl_ipv6_pipe() {
    var aclName = 'name1'

    ipv6_access_list_standard(aclName)

    v6_loop_generator(
      385,
      1,
      1,
      function (ipv6Addr, index) {
        acl_ipv6_config(index, 'permit', 'host', ipv6Addr, 'any')
      },
      {
        head: 2000,
        rear: 1
      }
    )
  }

  // acl_ipv6_pipe()

  function acl_mac_pipe() {
    var aclName = 'name1'

    mac_access_list_extended(aclName)

    macAddr_loop_generator(
      769,
      1,
      1,
      function (macAddr, index) {
        acl_mac_config(index, 'permit', macAddr, 'any', '70A', '70A')
      },
      {}
    )
  }

  // acl_mac_pipe()

  // Important: replace variable WEB_CONNECTED_PORT with which port you're connecting to WebUI via it before you execute this function
  function dhcp_snooping_binging_pipe(WEB_CONNECTED_PORT) {
    // enable the dhcp snooping function
    dhcp_snooping()

    var macConfigs = {
      type: 'unicast'
    }
    var v4LoopConfigs = {
      first: 192,
      second: 168,
      third: 1
    }

    var ports = 10

    var expirySeconds = '4294967295' // 60 - 4294967295

    var interfaceNamePrefix = 'ethernet 1/0/'

    // skip configure the port connecting with, in order to make the loop work properly.
    var disableDhcpSnoopingSkipTimes = 0
    var dhcpBindingSkipTimes = 0
    // loop through all of the ports then disable remove 'em from dhcp snooping trusted ports.
    loop(ports - 1, 0, 1, disableDhcpSnooping)
    // table size on specs is defined as 512, thus loop with 513 times to reach the limit.
    loop(513, 0, 1, pre)

    function disableDhcpSnooping(index) {
      var _index = index + disableDhcpSnoopingSkipTimes
      if (((_index % ports) + 1) % WEB_CONNECTED_PORT === 0) {
        disableDhcpSnoopingSkipTimes += 1
        _index = index + disableDhcpSnoopingSkipTimes
      }
      interface((_index % ports) + 1)
      dhcp_snooping_trust('disable')
      exit()
    }

    function pre(index) {
      var _index = index + dhcpBindingSkipTimes
      if (((_index % ports) + 1) % WEB_CONNECTED_PORT === 0) {
        dhcpBindingSkipTimes += 1
        _index = index + dhcpBindingSkipTimes
      }

      var vlanID = (_index % ports) + 1
      var interfaceName = interfaceNamePrefix + ((_index % ports) + 1)
      // create vlan
      vlan(vlanID)
      // exit from vlan configuration mode
      exit()
      // add vlan to dhcp snooping list
      dhcp_snooping_vlan(vlanID)

      macAddr_loop_generator(
        1,
        _index + 1,
        1,
        function (macAddr) {
          v4_loop_generator(
            1,
            _index + 1,
            1,
            function (ipv4Addr) {
              // do dhcp snooping binding with closure variables
              dhcp_snooping_binging(
                macAddr,
                vlanID,
                ipv4Addr,
                interfaceName,
                expirySeconds
              )
            },
            v4LoopConfigs
          )
        },
        macConfigs
      )
    }
  }
  // Important: replace variable WEB_CONNECTED_PORT with which port you're connecting to WebUI via it before you execute this function
  // 一定要把參數換成連接switch的port, 不然設成untrusted ports後一般的http request封包會被filter deny掉
  // dhcp_snooping_binging_pipe(8)
}

// This subroutine must be pasted into any JScript that calls 'Include'.
// NOTE: you may need to update your script engines and scripting runtime env
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
