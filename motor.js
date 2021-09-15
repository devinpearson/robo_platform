const keypress = require('keypress')
const five = require('johnny-five')
const Devastator = require('./index')(five)

keypress(process.stdin)

const board = new five.Board()

board.on('ready', function () {
  console.log('Welcome to Devastator')
  console.log('use your arrow buttons to move your robot. space to stop and q to quit')
  // Initialize a new Devastator.
  const bot = new Devastator({
    left: { pwm: 6, dir: 7 }, // left motor pins
    right: { pwm: 5, dir: 4 }, // right motor pins
    speed: 150 // full speed at 255
  })

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
    let action

    if (!key) {
      return
    }

    action = actions[key.name] || key.name

    if (action === 'q') {
      console.log('Quitting')
      bot.stop()
      setTimeout(process.exit, 500)
    }

    if (bot[action]) {
      bot[action]()
    }
  })
})
