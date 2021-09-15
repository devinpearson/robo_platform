const keypress = require('keypress')
const five = require('johnny-five')
const Devastator = require('./index')(five)
const io = require("socket.io")(3000)
const WebSocket = require('ws')
keypress(process.stdin)

const board = new five.Board()

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

board.on('ready', function () {
  console.log('Host Service starting...')
  console.log('opening websocket on port 3000...')
  // Initialize a new Devastator.
  const bot = new Devastator({
    left: { pwm: 6, dir: 7 }, // left motor pins
    right: { pwm: 5, dir: 4 }, // right motor pins
    speed: 205 // full speed at 255
  })

  io.on("connection", socket => {
    bot.stop()
    // either with send()
    socket.send("Hello!");
  
    // or with emit() and custom event names
    socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));
  
    // handle the event sent with socket.send()
    socket.on("message", (data) => {
      const actions = {
        up: 'fwd',
        down: 'rev',
        left: 'left',
        right: 'right',
        space: 'stop'
      }
      console.log(`Received message => ${data}`)
      const action = actions[data] || data

      if (bot[action]) {
        bot[action]()
      }
      console.log(data);
    });
  
    // handle the event sent with socket.emit()
    socket.on("salutations", (elem1, elem2, elem3) => {
      console.log(elem1, elem2, elem3);
    });

    socket.on("disconnect", (reason) => {
      console.log('connection lost: ' + reason)
      bot.stop()
    });
  });

  // const wss = new WebSocket.Server({ port: 8085 })

  // wss.on('connection', ws => {
  //   bot.stop()
  //   ws.isAlive = true;
  //   ws.on('pong', heartbeat);
  //   ws.on('message', message => {
  //     // Maps key names to bot methods
  //     const actions = {
  //       up: 'fwd',
  //       down: 'rev',
  //       left: 'left',
  //       right: 'right',
  //       space: 'stop'
  //     }
  //     console.log(`Received message => ${message}`)
  //     const action = actions[message] || message

  //     if (bot[action]) {
  //       bot[action]()
  //     }
  //   })

  //   ws.onclose = function (event) {
  //     console.log('The connection has been closed successfully.');
  //     console.log('connection lost')
  //     clearInterval(interval);
  //     bot.stop()
  //   }
  // })

  // const interval = setInterval(function ping() {
  //   wss.clients.forEach(function each(ws) {
  //     if (ws.isAlive === false) return ws.terminate();
  //     console.log('checking connection...')
  //     ws.isAlive = false;
  //     ws.ping(noop);
  //   });
  // }, 30000);

  // Maps key names to bot methods
  const actions = {
    up: 'fwd',
    down: 'rev',
    left: 'left',
    right: 'right',
    space: 'stop'
  }

  // Ensure the bot is stopped
  bot.stop()

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
      bot.stop()
      setTimeout(process.exit, 500)
    }

    if (bot[action]) {
      bot[action]()
    }
  })

  board.on("exit", () => {
    bot.stop();
  });
})
