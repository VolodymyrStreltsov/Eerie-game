export default class UIElements {
  constructor(game){
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Arial'
    this.fontColor = 'rgba(255, 255, 255, 0.7)'
    this.shadowColor = 'rgba(0, 0, 0, 0.9)'
    this.liveImage = heart
  }
  draw(context, game){
    context.save()
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowBlur = 1
    context.shadowColor = this.shadowColor
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.textAlign = 'center'
    context.fillStyle = this.fontColor
    context.fillText(`Score: ${this.game.score}`, this.game.width * 0.15, 50)

    for(let i = 0; i < this.game.lives; i++){
    context.drawImage(this.liveImage, 30 * i + 20, 70, 20, 20)
    }

    if(game.gameOnTime){
    context.font = `${this.fontSize * 0.7}px ${this.fontFamily}`
    context.fillText(`Time: ${(this.game.time * 0.001).toFixed(1)}`, this.game.width * 0.15, 80 + this.fontSize)
    }

    if(this.game.gameOver){
      if(this.game.score > 1){
      context.font = `${this.fontSize * 1.5}px ${this.fontFamily}`
      context.fillText(`You are win`, this.game.width * 0.5, this.game.height * 0.5)
    }
      else {
      context.font = `${this.fontSize * 1.5}px ${this.fontFamily}`
      context.fillText(`Game over`, this.game.width * 0.5, this.game.height * 0.5)
    }
   }
    context.restore()
  }
}