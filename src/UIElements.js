import quotes from "./quotesArray.js"

export default class UIElements {
  constructor(game){
    this.game = game
    this.largeFontSize = 30
    this.mediumFontSize = 23
    this.smallFontSize = 18
    this.fontFamily = 'Amatic SC'
    this.mainFontColor = 'rgba(255, 255, 255, 0.7)'
    this.secondaryFontColor = 'rgba(0, 0, 0, 0.5)'
    this.shadowColor = 'rgba(0, 0, 0, 0.9)'
    this.liveImage = heart
    this.energyImage = energy
    this.gameOverSound = new Audio('./assets/sounds/death.flac')
    this.themeSound = new Audio('./assets/sounds/theme.mp3')
    this.themeSound.volume = 0.2
  }
  draw(context){
    context.save()
    if(this.game.input.keys.length > 0) this.themeSound.play()

    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowBlur = 1
    context.shadowColor = this.shadowColor
    context.font = `${this.largeFontSize}px ${this.fontFamily}`
    context.textAlign = 'center'
    context.fillStyle = this.mainFontColor
    context.fillText(`Pumpkins: ${this.game.score}`, this.game.width * 0.2, 50)

    for(let i = 0; i < this.game.lives; i++){
    context.drawImage(this.liveImage, 30 * i + 20, 70, 20, 20)
    }

    context.drawImage(this.energyImage, this.game.width * 0.05, this.game.height - 30, 20, 20)
    context.fillText(`${this.game.energy.toFixed(0)}`, this.game.width * 0.15, this.game.height - 10)
    context.font = `${this.smallFontSize}px ${this.fontFamily}`
    context.fillStyle = this.secondaryFontColor
    context.shadowColor = 'rgba(255, 255, 255)'
    context.fillText('press X to attack', this.game.width * 0.8, this.game.height - 15)


    console.log(this.game.randomQuote)
    if(this.game.gameOver){
      this.themeSound.pause()
      this.gameOverSound.play()
      context.font = `italic ${this.mediumFontSize}px ${this.fontFamily}`
      context.fillStyle = this.mainFontColor
      context.shadowColor = this.shadowColor
      context.fillText(`“${quotes[this.game.randomQuote]?.quote}”`, this.game.width * 0.5, this.game.height * 0.4)
      context.font = `${this.mediumFontSize}px ${this.fontFamily}`
      context.fillText(`${quotes[this.game.randomQuote]?.author}`, this.game.width * 0.5, this.game.height * 0.48)
      context.font = `${this.smallFontSize}px ${this.fontFamily}`
      context.fillText(`Press Enter to restart`, this.game.width * 0.5, this.game.height * 0.55)
   }
    context.restore()
  }
}