eval(Include('apis/sleep.js'))

function send(str) {
  sleep(50) // defer 50ms to send another message
  crt.Screen.Send(str)
}


