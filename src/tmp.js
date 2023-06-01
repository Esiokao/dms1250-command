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

// loop(257, 1, 1, function (index) {
//   var eventIndex = index
//   var eventDesc = randChar(127) // 1~127chars
//   rmon_event(eventIndex, eventDesc)
// })

// loop(257, 1, 1, function (index) {
//   rmon_alarm(index, 5, 'absolute', 5, index, 1, index)
// })
