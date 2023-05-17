/**
 * @env ES3 / JSscript
 * @author perry@Cameo <https://github.com/Esiokao>
 * @description utility scripts to setup poe-poh
 * @license MIT
 * @version 0.0.1
*/

// dynamic import api modules
eval(Include('apis/send.js'))
eval(Include('utils/decToHex.js'))
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
  ip : {
    name: 'EXIP1'
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

function acl_ipv6_config(seqNum, act, proto, srcIP, destIP) {
  // rule 1 permit tcp any any
  var command = 'rule' + ' ' + seqNum + ' ' + act + ' ' + proto + ' ' + srcIP + ' ' + destIP + '\n'
  send(command)
}

function ip_access_list_extended(name) {
  // ip access-list [extended] NAME 
  var command = 'ip access-list extended' + ' ' + name + '\n'
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
  var commnad = 'interface' + ' ' + 'ethernet' + ' ' + '1/0/' +  String(int) + '\n'
  send(commnad)
}

function port_security(macAddr, vlan) {
  var command = 'switchport' + ' ' + 'port-security' + ' ' + 'mac-address' + ' ' +  macAddr + ' ' + 'vlan' + ' ' + vlan + '\n'
  send(command)
}


// entry point
function main() {
  // send('conf t \n')

  for(var i = 1; i <= 10; i += 1) {
    interface(i)

    var five = 0
    var six = 0
    var seven = 0
    var eight = 0

    for(var j = 1; j <= 33; j +=1 ) {
      eight = decToHex(j % 16)
      seven = decToHex(Math.floor(j / 16))
      six = decToHex(Math.floor(j / (16*8)))
      five = decToHex(Math.floor(j / (16*8*8)))

      var macAddr = '00-00-00-00' + '-' + five + six  + '-' + seven + eight

      port_security(macAddr, i)
    }

    exit()
  }

  // 123456
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
