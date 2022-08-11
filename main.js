import Background from './src/background.js'
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from './src/enemies.js'
import InputHandler from './src/input.js'
import Player from './src/player.js'

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
      this.enemies = []
      this.enemiesArray = [new FlyingEnemy(this), new GroundEnemy(this), new ClimbingEnemy(this)]
      this.enemyTimer = 0
      this.enemyInterval = 1000
    }
    update(deltaTime){
      this.background.update()
      this.player.update(this.input.keys, deltaTime)

      if(this.enemyTimer > this.enemyInterval){
        this.addEnemy()
        this.enemyTimer = 0
      } else this.enemyTimer += deltaTime


      this.enemies.forEach(enemy => {
        enemy.update(deltaTime)
        if(enemy.readyForDelete) this.enemies.splice(this.enemies.indexOf(enemy), 1)
      })
    }
    draw(context){
      this.background.draw(context)
      this.player.draw(context)

      this.enemies.forEach(enemy => {
        enemy.draw(context)
      })
    }
    addEnemy(){
      if(this.speed <= 0 && Math.random() < 0.99 && this.enemies.length < 4) this.enemies.push(new GroundEnemy(this))
      else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this))
      this.enemies.push(new FlyingEnemy(this))
      console.log(this.enemies)
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