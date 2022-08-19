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
    if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
    context.drawImage(this.image, this.frameX * this.imgWidth, 0, this.imgWidth, this.imgHeight, this.x, this.y, this.width, this.height)
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game){
    super()
    this.game = game
    this.imgWidth = 100
    this.imgHeight = 71
    this.sizeModifier = Math.random() + 0.5
    this.width = this.imgWidth * this.sizeModifier
    this.height = this.imgHeight * this.sizeModifier
    this.x = this.game.width + Math.random() * this.game.width * 0.5
    this.y = Math.random() * this.game.height * 0.5
    this.speedX = Math.random() + 1
    this.speedY = 0
    this.maxFrame = 5
    this.image = flyingEnemy
    this.angle = 0
    this.va = Math.random() * 0.1 - 0.1
    this.timeSinceFlap = 0
    this.flapInterval = Math.random() * 50 + 100
  }
  update(deltaTime){
    super.update(deltaTime)
    this.angle += this.va
    this.y += Math.sin(this.angle)
    this.timeSinceFlap += deltaTime
    if(this.timeSinceFlap > this.flapInterval){
      this.timeSinceFlap = 0
    }
  }
}

export class GroundEnemy extends Enemy {
    constructor(game){
    super()
    this.game = game
    this.imgWidth = 50
    this.imgHeight = 26
    this.sizeModifier = Math.random() * 0.5
    this.width = this.imgWidth * this.sizeModifier
    this.height = this.imgHeight * this.sizeModifier
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
    this.imgWidth = 100
    this.imgHeight = 81
    this.sizeModifier = Math.random() + 0.5
    this.width = this.imgWidth * this.sizeModifier
    this.height = this.imgHeight * this.sizeModifier
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