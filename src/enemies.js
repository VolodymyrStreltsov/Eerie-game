class Enemy {
  constructor(){
    this.frameX = 0
    this.frameY = 0
    this.fps = 20
    this.frameInterval = 1000/this.fps
    this.frameTimer = 0
    this.readyForDelete = false
  }
  update(deltaTime){
    this.x -= this.speedX + this.game.speed
    this.y += this.speedY
    if(this.frameTimer > this.frameInterval){
      this.frameTimer = 0
      if(this.frameX < this.maxFrame) this.frameX++
      else this.frameX = 0
    } else this.frameTimer += deltaTime

    if(this.x + this.width < 0) this.readyForDelete = true
  }
  draw(context){
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game){
    super()
    this.game = game
    this.width = 50
    this.height = 26
    this.x = this.game.width + Math.random() * this.game.width * 0.5
    this.y = Math.random() * this.game.height * 0.5
    this.speedX = Math.random() + 1
    this.speedY = 0
    this.maxFrame = 5
    this.image = flyingEnemy
    this.angle = 0
    this.va = Math.random() * 0.1 - 0.1
  }
  update(deltaTime){
    super.update(deltaTime)
    this.angle += this.va
    this.y += Math.sin(this.angle)
  }
}

export class GroundEnemy extends Enemy {
    constructor(game){
    super()
    this.game = game
    this.width = 100
    this.height = 71
    this.x = this.game.width + Math.random() * this.game.width * 0.5
    this.y = this.game.height - this.game.groundMargin - this.height
    this.speedX = 0
    this.speedY = 0
    this.maxFrame = 5
    this.image = groundEnemy
  }
  update(deltaTime){
    super.update(deltaTime)
  }
}

export class ClimbingEnemy extends Enemy {
    constructor(game){
    super()
    this.game = game
    this.width = 100
    this.height = 81
    this.x = this.game.width
    this.y = Math.random() * this.game.height * 0.5
    this.speedX = 0
    this.speedY = Math.random() > 0.5 ? 1 : -1
    this.maxFrame = 5
    this.image = climbingEnemy
  }
  update(deltaTime){
    super.update(deltaTime)
    if(this.y + this.height > this.game.height - this.game.groundMargin || this.y < -this.height){
      this.speedY *= -1
    }
  }
  draw(context){
    super.draw(context)
    context.beginPath()
    context.moveTo(this.x + this.width * 0.5, 0)
    context.lineTo(this.x + this.width * 0.5, this.y + 20)
    context.stroke()
  }
}