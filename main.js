import Background from './src/background.js'
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from './src/enemies.js'
import InputHandler from './src/input.js'
import Player from './src/player.js'
import UIElements from './src/UIElements.js'



window.addEventListener('load', function(){
  const canvas = canvas1
  const ctx = canvas.getContext('2d')
  canvas.width = 500
  canvas.height = 500

  class Game {
    constructor(width, height){
      this.width = width
      this.height = height
      this.groundMargin = 30
      this.speed = 0
      this.maxSpeed = 3
      this.background = new Background(this)
      this.player = new Player(this)
      this.input = new InputHandler(this)
      this.UI = new UIElements(this)
      this.enemies = []
      this.particles = []
      this.collisions = []
      this.maxParticles = 50
      this.enemiesArray = [new FlyingEnemy(this), new GroundEnemy(this), new ClimbingEnemy(this)]
      this.enemyTimer = 0
      this.enemyInterval = 1000
      this.debug = false
      this.score = 0
      this.lives = 3
      this.gameOver = false
      this.player.currentState = this.player.states[0]
      this.player.currentState.enter()
      this.energy = 100
      this.energyMax = 100
    }
    update(deltaTime){
      if(this.lives <= 0) this.gameOver = true

      this.background.update()
      this.player.update(this.input.keys, deltaTime)

      if(this.enemyTimer > this.enemyInterval){
        this.addEnemy()
        this.enemyTimer = 0
      } else this.enemyTimer += deltaTime

      this.enemies.forEach((enemy, idx) => {
        enemy.update(deltaTime)
        if(enemy.readyForDelete) this.enemies.splice(idx, 1)
      })

      this.collisions.forEach((collision, idx) => {
        collision.update(deltaTime)
        if(collision.readyForDelete) this.collisions.splice(idx, 1)
      })

      this.particles.forEach((particle, idx) => {
        particle.update()
        if(particle.readyForDelete) this.particles.splice(idx, 1)
      })
      if(this.particles.length > this.maxParticles) this.particles.length = this.maxParticles
    }
    draw(context){
      this.background.draw(context)
      this.player.draw(context)

      this.enemies.forEach(enemy => {
        enemy.draw(context)
      })

      this.collisions.forEach(collision => {
        collision.draw(context)
      })

      this.particles.forEach(particle => {
        particle.draw(context)
      })

      this.UI.draw(context)
    }
    addEnemy(){
      if(Math.random() > 0.8 && this.enemies.length < 4) this.enemies.push(new GroundEnemy(this))
      else if(this.speed > 0 && Math.random() > 0.7) this.enemies.push(new ClimbingEnemy(this))
      else if(Math.random() > 0.5) this.enemies.push(new FlyingEnemy(this))
    }
    restart(){
      this.player.restart()
      this.speed = 0
      this.score = 0
      this.lives = 3
      this.gameOver = false
      this.enemies = []
      this.particles = []
      this.collisions = []
      this.player.currentState = this.player.states[0]
      this.player.currentState.enter()
      this.energy = 100
      animate(0)
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
    if(!game.gameOver) requestAnimationFrame(animate)
  }
  animate(0)
})