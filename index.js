module.exports = function (five) {
  return (function () {
    function Devastator (opts) {
      if (typeof opts.right.pwm === 'number' ||
          typeof opts.right.pwm === 'string') {
        opts.right = new five.Motor({
          pins: {
            pwm: opts.right.pwm,
            dir: opts.right.dir
          }
          // invertPWM: true
        })
      }

      if (typeof opts.left.pwm === 'number' ||
          typeof opts.left.pwm === 'string') {
        opts.left = new five.Motor({
          pins: {
            pwm: opts.left.pwm,
            dir: opts.left.dir
          }
          // invertPWM: true
        })
      }

      this.motors = {
        right: opts.right,
        left: opts.left
      }

      this.speed = opts.speed === undefined ? 0 : opts.speed
    }

    Devastator.prototype.fwd = function (speed) {
      speed = typeof speed === 'undefined' ? this.speed : speed

      this.speed = speed

      this.motors.right.forward(this.speed)
      this.motors.left.forward(this.speed)
      
      return this
    }

    Devastator.prototype.rev = function (speed) {
      speed = typeof speed === 'undefined' ? this.speed : speed

      this.speed = speed

      this.motors.right.reverse(this.speed)
      this.motors.left.reverse(this.speed)

      return this
    }

    Devastator.prototype.stop = function () {
      this.motors.left.stop()
      this.motors.right.stop()
    }

    Devastator.prototype.right = function () {
      const speed = this.speed - 50

      this.motors.left.forward(speed)
      this.motors.right.reverse(speed)
    }

    Devastator.prototype.left = function () {
      const speed = this.speed - 50

      this.motors.left.reverse(speed)
      this.motors.right.forward(speed)
    }

    return Devastator
  }())
}
