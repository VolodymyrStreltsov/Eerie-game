import Background from './background.js'
import InputHandler from './input.js'
import Player from './player.js'

window.addEventListener('load', function(){
  const canvas = canvas1
  const ctx = canvas.getContext('2d')
  canvas.width = 500
  canvas.height = 500

  class Game {
    constructor(width, height){
      this.width = width
      this.height = height
      this.groundMargin = 40
      this.speed = 0
      this.maxSpeed = 3
      this.background = new Background(this)
      this.player = new Player(this)
      this.input = new InputHandler()
    }
    update(deltaTime){
      this.background.update()
      this.player.update(this.input.keys, deltaTime)
    }
    draw(context){
      this.background.draw(context)
      this.player.draw(context)
    }
  }

  const game = new Game(canvas.width, canvas.height)

  let lastTime = 0

  const animate = function(timeStamp){
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime)
    game.draw(ctx)
    requestAnimationFrame(animate)
  }
  animate(0)
})