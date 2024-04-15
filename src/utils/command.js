function command(commandArr) {
  var cmd = ''
  for (var i = 0; i < commandArr.length; i += 1) {
    cmd += commandArr[i] + ' '
  }
  cmd += '\n'
  return cmd
}
