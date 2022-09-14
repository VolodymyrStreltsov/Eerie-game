export class Explosion {
  constructor(game, x, y){
    this.game = game
    this.imgWidth = 100
    this.imgHeight = 90
    this.image = boom
    this.sizeModifier = Math.random() + 0.5
    this.width = this.imgWidth * this.sizeModifier
    this.height = this.imgHeight * this.sizeModifier
    this.x = x - this.width * 0.5
    this.y = y - this.height * 0.5
    this.frameX = 0
    this.maxFrame = 4
    this.readyForDelete = false
    this.fps = 13
    this.frameInterval = 1000/this.fps
    this.frameTimer = 0
    this.sound = new Audio('./assets/sounds/explosion.flac')
    this.sound.volume = 0.5
  }
  update(deltaTime){
    if(this.frameX === 0) this.sound.play()

    this.x -= this.game.speed

    if(this.frameTimer > this.frameInterval){
      this.frameTimer = 0
      if(this.frameX < this.maxFrame) this.frameX++
      else this.readyForDelete = true
    } else this.frameTimer += deltaTime
  }
  draw(context){
    context.save()
    context.globalAlpha = 0.6
    context.drawImage(this.image, this.frameX * this.imgWidth, 0, this.imgWidth, this.imgHeight, this.x, this.y, this.width, this.height)
    context.restore()
  }
}

export class FloatingMessage {
  constructor(value, x, y, targetX, targetY){
    this.value = value
    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY
    this.readyForDelete = false
    this.timer = 0
    this.sound = new Audio('./assets/sounds/churchbell.flac')
    this.sound.volume = 0.3
  }
  update(){
    this.sound.play()
    this.x += (this.targetX - this.x) * 0.05
    this.y += (this.targetY - this.y) * 0.05
    this.timer++
    if(this.timer > 100) this.readyForDelete = true
  }
  draw(context){
    context.shadowColor = 'rgba(0, 0, 0, 0.9)'
    context.font = '20px Amatic SC'
    context.textAlign = 'center'
    context.fillStyle = 'rgba(255, 255, 255, 0.7)'
    context.fillText(this.value, this.x, this.y)
  }
}