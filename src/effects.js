class Effects {
  constructor(game){
    this.game = game
    this.readyForDelete = false
  }
  update(){
    this.x -= this.speedX + this.game.speed
    this.y -= this.speedY
    this.size *= 0.95
    if(this.size < 0.5) this.readyForDelete = true
  }
}

export class Dust extends Effects {
  constructor(game, x, y){
    super(game)
    this.x = x
    this.y = y
    this.size = Math.random() * 10 + 10
    this.speedX = Math.random()
    this.speedY = Math.random()
    this.color = 'rgba(255, 255, 255, 0.3)'
  }
  draw(context){
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fillStyle = this.color
    context.fill()
  }
}

export class Splash extends Effects {
  constructor(){

  }
}

export class Fire extends Effects {
  constructor(game, x, y){
    super(game)
    this.x = x
    this.y = y
    this.size = Math.random() * 100 + 50
    this.speedX = 1
    this.speedY = 1
    this.image = fire
    this.angle = 0
    this.va = Math.random() * 0.1 - 0.01
  }
  update(){
    super.update()
    this.angle += this.va
    this.x += Math.sin(this.angle * 5)
  }
  draw(context){
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size)
    context.restore()
  }
}