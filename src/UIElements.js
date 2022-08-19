export default class UIElements {
  constructor(game){
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Arial'
    this.fontColor = 'rgba(255, 255, 255, 0.7)'
    this.shadowColor = 'rgba(0, 0, 0, 0.9)'
    this.liveImage = heart
    this.gameOverSound = new Audio('./assets/sounds/death.wav')
    this.themeSound = new Audio('./assets/sounds/theme.mp3')
    this.themeSound.volume = 0.1
  }
  draw(context){
    context.save()
    if(this.game.input.keys.length > 0) this.themeSound.play() // TODO autoplay

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

    if(this.game.gameOver){
      this.themeSound.pause()
      this.gameOverSound.play()
      context.font = `${this.fontSize}px ${this.fontFamily}`
      context.fillText(`Game over. Your score: ${this.game.score}`, this.game.width * 0.5, this.game.height * 0.5)
      context.fillText(`Press Enter or swipe up to restart`, this.game.width * 0.5, this.game.height * 0.6)
   }
    context.restore()
  }
}