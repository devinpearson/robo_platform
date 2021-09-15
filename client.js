const keypress = require('keypress')
const WebSocket = require('ws')
const io = require("socket.io-client");

keypress(process.stdin)

console.log('Welcome to Devastator')
console.log('use your arrow buttons to move your robot. space to stop and q to quit')
// Initialize a new Devastator.

const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  // either with send()
  socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
});

// handle the event sent with socket.send()
socket.on("message", data => {
  console.log(data);
});

// handle the event sent with socket.emit()
socket.on("greetings", (elem1, elem2, elem3) => {
  console.log(elem1, elem2, elem3);
});
  
  // const url = 'ws://localhost:8085'
  // connection = new WebSocket(url)
  // Maps key names to bot methods
  const actions = {
    up: 'fwd',
    down: 'rev',
    left: 'left',
    right: 'right',
    space: 'stop'
  }

  // A bit of keypress ceremony ;)
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.setRawMode(true)

  process.stdin.on('keypress', function (ch, key) {
    if (!key) {
      return
    }

    const action = actions[key.name] || key.name

    if (action === 'q') {
      console.log('Quitting')
      socket.send('stop')
      setTimeout(process.exit, 500)
    }

    // connection.onerror = error => {
    //   console.error(error)
    // }
    socket.send(action)
  })
