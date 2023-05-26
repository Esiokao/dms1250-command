eval(Include('apis/send.js'))

// singleton principle
function Initializer() {
  
  this.http = function () {
    clear_running_config()
    login()
    web_timeout()
  }

  this.https = function httpsInit() {
    clear_running_config()
    login()
    enable_https_server()
    web_timeout()
  }

  this.ssh = function () {
    send('ip ssh server' + '\n')
    send('ip ssh timeout 300' + '\n')
    send('ip ssh authentication-retries 10' + '\n')
  }


  function enable_https_server() {
    send('conf t \n')
    send('ip http sec \n')
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
