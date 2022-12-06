eval(Include('apis/sleep.js'))

function send(str) {
  sleep(115) // defer 115ms to send another message
  crt.Screen.Send(str)
}


