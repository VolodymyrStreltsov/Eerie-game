class Reward {
  constructor(){
    this.frameX = 0
    this.frameY = 0
    this.fps = 5
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
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}

export class Pumpkin extends Reward {
    constructor(game){
    super()
    this.maxFrame = 0
    this.image = pumpkin
    this.game = game
    this.width = 56
    this.height = 50
    this.x = this.game.width + Math.random() * this.game.width * 0.5
    this.y = Math.random() * this.game.height * 0.5
    this.speedX = 0
    this.speedY = 0
  }
  update(deltaTime){
    super.update(deltaTime)
  }
}