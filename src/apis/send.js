eval(Include('apis/sleep.js'))

function send(str) {
  crt.Screen.Send(str)
  sleep(25) // defer 25ms to send another message
}


