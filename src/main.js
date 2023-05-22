/**
 * @env ES3 / JSscript
 * @author perry@Cameo <https://github.com/Esiokao>
 * @description utility scripts to setup poe-poh
 * @license MIT
 * @version 0.0.1
*/


// dynamic import api modules
eval(Include('apis/send.js'))
eval(Include('apis/sleep.js'))
eval(Include('utils/decToHex.js'))
eval(Include('utils/randChar.js'))
eval(Include('utils/randNum.js'))
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
  var command = 'rule' + ' ' + seqNum + ' ' + act + ' ' + macSrc + ' ' + macDest + ' ' + 'ethernet-type' + ' ' + ethType + ' ' + ethMask + '\n'
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

function ip_access_list_standard(name) {
  // ip access-list NAME 
  var command = 'ip access-list' + ' ' + name + '\n'
  send(command)
}

function acl_ipv6_config(seqNum, act, proto, srcIP, destIP) {
  // rule 1 permit tcp any any
  var command = 'rule' + ' ' + seqNum + ' ' + act + ' ' + proto + ' ' + srcIP + ' ' + destIP + '\n'
  send(command)
}

function acl_ip_config(seqNum, act, proto, srcIP, destIP) {
  // rule 1 permit tcp any any
  var command = 'rule' + ' ' + seqNum + ' ' + act + ' ' + proto + ' ' + srcIP + ' ' + destIP + '\n'
  send(command)
}

function exit() {
  var command = 'exit \n'
  send(command)
}

function interface(int) {
  var commnad = 'interface' + ' ' + 'ethernet' + ' ' + '1/0/' + String(int) + '\n'
  send(commnad)
}

function port_security(macAddr, vlan) {
  var command = 'switchport' + ' ' + 'port-security' + ' ' + 'mac-address' + ' ' + macAddr + ' ' + 'vlan' + ' ' + vlan + '\n'
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
  var command = 'radius-server host ' + ip + ' key 0 ' + Math.ceil(Math.random() * 1000000) + '\n'
  send(command)
}

function tacacs_server(ip) {
  var command = 'tacacs-server host ' + ip + ' key 0 ' + Math.ceil(Math.random() * 1000000) + '\n'
  send(command)
}

function macAddr_loop_generator(num, base, step, fn) {
  for (var i = base; i < base + num * step; i += step) {
    eight = decToHex(i % 16)
    seven = decToHex(Math.floor(i / 16))
    six = decToHex(Math.floor(i / (16 * 8)))
    five = decToHex(Math.floor(i / (16 * 8 * 8)))

    var macAddr = '00-00-00-00' + '-' + five + six + '-' + seven + eight

    fn(macAddr)
  }
}

function v4_loop_generator(num, base, step, fn) {
  var ipv4
  var first = 192
  var second = 168
  var third = 0
  var fourth = 0
  for (var i = base; i < base + num * step; i += step) {
    third = Math.floor(i / 255)
    fourth = i % 255
    ipv4 = String(first) + '.' + String(second) + '.' + String(third) + '.' + String(fourth)

    fn(ipv4)
  }
}

function v6_loop_generator(num, base, step, fn) {
  var ipv6
  for (var i = base; i < base + num * step; i += step) {
    var first = 8192
    var rear = 1
    first = decToHex(first + i)
    ipv6 = String(first) + '::' + String(rear)

    fn(ipv6)
  }
}

function random_loop_generator(generator1, generator2) {
  return function (num, step, fn1, fn2) {
    for (var i = 0; i < num; i += step) {
      Math.round(Math.random()) ? generator1(1, i, step, fn1) : generator2(1, i, step, fn2)
    }
  }
}

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
    var command = 'authentication username ' + username + ' password 0 ' + password + ' vlan ' + vlanID + '\n'
  }
  else {
    var command = 'authentication username ' + username + ' password 0 ' + password + '\n'
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

function login() {
  send('\n')
  send('admin\n')
  send('admin\n')
  send('conf t \n')
}

function clear_running_config() {
  send('exit\n')
  send('exit\n')
  send('exit\n')
  send('exit\n')
  send('\n')
  send('\n')
  send('admin\n')
  send('admin\n')
  send('\n')
  send('clear running \n', 1000)
  send('y\n')
  sleep(3000)
}

function web_timeout(timeout) {
  timeout = timeout ? timeout : '36000'
  var command = 'ip http time idle ' + timeout + '\n'
  send(command)
}


function snmpv1_v2c_group_table(groupName, readName, writeName, notifyName, stdIPAcessListName) {
  var version = ['v1', 'v2c']
  var v = version[Math.round(Math.random())]
  var readSyntax = readName === '' ? '' : ' read ' + readName
  var writeSyntax = writeName === '' ? '' : ' write ' + 'writeName'
  var notifySyntax = notifyName === '' ? '' : ' notify ' + notifyName
  
  var command = 'snmp group ' + groupName + ' ' + v + ' ' + readSyntax + writeSyntax + notifySyntax + ' access ' + stdIPAcessListName + '\n'
  
  send(command)
}

function snmpv3_group_table(groupName, readName, writeName, notifyName, stdIPAcessListName) {
  var version = 'v3'
  var secLvlArr = ['auth', 'noauth', 'priv']
  var secLvl = secLvlArr[randNum(1) % 3]
  var readSyntax = readName === '' ? '' : ' read ' + readName
  var writeSyntax = writeName === '' ? '' : ' write ' + 'writeName'
  var notifySyntax = notifyName === '' ? '' : ' notify ' + notifyName
  
  var command = 'snmp group ' + groupName + ' ' + version + ' ' + secLvl + ' ' + readSyntax + writeSyntax + notifySyntax + ' access ' + stdIPAcessListName + '\n'

  send(command)
}

function snmp_user_table(userName, groupName, stdIPAcessListName) {
  var version = 'v1'
  var command = 'snmp user ' + userName + ' ' + groupName + ' ' + version + ' access ' + stdIPAcessListName + '\n'
  send(command)
}

function rmon_event(evtIdx, evtDesc) {
  var command = 'rmon event ' + evtIdx + ' description ' + evtDesc + '\n'
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

function httpInit() {
  clear_running_config()
  login()
  web_timeout()
}

function enable_https_server() {
  send('conf t \n')
  send('ip http sec \n')
}

function httpsInit() {
  clear_running_config()
  login()
  enable_https_server()
  web_timeout()
}
// -- utils end------------------

// entry point
function main() {
  // httpInit()
  httpsInit()

  var accessListCache = []
  var snmpGroupListCache = []
  // random_loop_generator(v4_loop_generator, v6_loop_generator)(20, 1, tacacs_server, tacacs_server)

  // for(var i = 1; i <= 10; i += 1) {
  //   authentication(10, '')
  // }

  // v4_loop_generator(17, 1, 1, edit_arp_list(configs.arpList.action))


  // for (var i = 0; i <= 10; i += 1) {

  //   macAddr_loop_generator(1, 1, 1, dhcp_server_screen(randChar(32)))
  //   exit()
  // }


  // loop(25, 1, 1, function (index) {
  //   var accessListName = 'S' + index
  //   ip_access_list_standard(accessListName)
  //   accessListCache.push(accessListName)
  //   exit()
  // })
  // loop(25, 26, 1, function (index) {
  //   var accessListName = 'S' + index
  //   ipv6_access_list_standard(accessListName)
  //   accessListCache.push(accessListName)
  //   exit()
  // })



  // loop(257, 1, 1, function(index){
  //   authentication(index, index)
  // })

  // loop(46, 1, 1, function (index) {

  //   var readName = genRand() === 1 ? randChar(5) : ''
  //   var writeName = genRand() === 1 ? randChar(5) : ''
  //   var notifyName = genRand() === 1 ? randChar(5) : ''
  //   var groupName = 'snmpGroup' + index 
  //   var accessListName = 'S' + index
  //   snmpv1_v2c_group_table(groupName, readName, writeName, notifyName, accessListName)
  // })

  // loop(51, 1, 1, function (index) {
  //   var userName = 'user' + index
  //   var groupName = 'snmpGroup' + ((index % 45) + 1 )
  //   var accessListName = 'S' + index 
  //   snmp_user_table(userName, groupName, accessListName)
  // })

  loop(257, 1, 1, function(index){
    var eventIndex = index
    var eventDesc = randChar(127) // 1~127chars
    rmon_event(eventIndex, eventDesc)
  })
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
