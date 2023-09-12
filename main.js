import Background from './src/background.js'
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from './src/enemies.js'
import GameObjectManager from './src/gameObjectManager.js'
import InputHandler from './src/input.js'
import Player from './src/player.js'
import { Pumpkin } from './src/rewards.js'
import UIElements from './src/UIElements.js'



window.addEventListener('load', function(){
  const canvas = canvas1
  const ctx = canvas.getContext('2d')
  canvas.width = 800
  canvas.height = 500

  class Game {
    constructor(width, height){
      this.width = width
      this.height = height
      this.groundMargin = 30
      this.speed = 0
      this.maxSpeed = 2
      this.background = new Background(this)
      this.player = new Player(this)
      this.input = new InputHandler(this)
      this.UI = new UIElements(this)
      this.enemies = []
      this.particles = []
      this.collisions = []
      this.rewards = []
      this.maxParticles = 50
      this.enemiesArray = [new FlyingEnemy(this), new GroundEnemy(this), new ClimbingEnemy(this)]
      this.enemyTimer = 0
      this.enemyInterval = 1000
      this.rewardTimer = 0
      this.rewardInterval = 2000
      this.debug = false
      this.score = 0
      this.lives = 3
      this.gameOver = false
      this.player.currentState = this.player.states[0]
      this.player.currentState.enter()
      this.energy = 100
      this.energyMax = 100
      this.randomQuote = ~~(Math.random() * 7)

      this.enemyManager = new GameObjectManager(this.enemies)
      this.rewardManager = new GameObjectManager(this.rewards)
      this.collisionManager = new GameObjectManager(this.collisions)
      this.particleManager = new GameObjectManager(this.particles)
    }
    update(deltaTime){
      if(this.lives <= 0){
        setTimeout(() => {
          this.gameOver = true
          this.player.y = this.height - this.player.height - this.groundMargin
        }, 550);
      }

      this.background.update()
      this.player.update(this.input.keys, deltaTime)

      if(this.enemyTimer > this.enemyInterval){
        this.addEnemy()
        this.enemyTimer = 0
      } else this.enemyTimer += deltaTime

      if(this.rewardTimer > this.rewardInterval){
        this.addReward()
        this.rewardTimer = 0
      } else this.rewardTimer += deltaTime


      this.enemyManager.update(deltaTime)
      this.rewardManager.update(deltaTime)
      this.collisionManager.update(deltaTime)
      this.particleManager.update(deltaTime)

      if(this.particles.length > this.maxParticles) this.particles.length = this.maxParticles
    }
    draw(context){
      this.background.draw(context)
      this.player.draw(context)

      this.rewardManager.draw(context)
      this.enemyManager.draw(context)
      this.collisionManager.draw(context)
      this.particleManager.draw(context)

      this.UI.draw(context)
    }
    addEnemy(){
      if(this.speed > 0 && Math.random() > 0.8) this.enemies.push(new GroundEnemy(this))
      else if(this.speed > 0 && Math.random() > 0.7) this.enemies.push(new ClimbingEnemy(this))
      else if(Math.random() > 0.5) this.enemies.push(new FlyingEnemy(this))
    }
    addReward(){
      if(Math.random() > 0.7 && this.rewards.length <= 1) this.rewards.push(new Pumpkin(this))
    }
    restart(){
      this.gameOver = false
      this.player.restart()
      this.speed = 0
      this.score = 0
      this.lives = 3
      this.player.currentState = this.player.states[0]
      this.player.currentState.enter()
      this.energy = 100
      this.randomQuote = ~~(Math.random() * 7)
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
