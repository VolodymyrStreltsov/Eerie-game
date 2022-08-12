export default class UIElements {
  constructor(game){
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Arial'
    this.fontColor = 'white'
  }
  draw(context){
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.textAlign = 'center'
    context.fillStyle = this.fontColor
    context.fillText(`Score: ${this.game.score}`, this.game.width * 0.5, this.fontSize)
  }
}