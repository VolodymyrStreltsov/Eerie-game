class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game
    this.width = width
    this.height = height
    this.speedModifier = speedModifier
    this.image = image
    this.x = 0
    this.y = 0
  }
  update() {
    if (this.x < -this.width) this.x = 0
    else this.x -= this.game.speed * this.speedModifier
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height)
    context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }
}

export default class Background {
    constructor(game){
      this.game = game
      this.width = 2000
      this.height = 500
      this.layerImg1 = layer1
      this.layerImg2 = layer2
      this.layerImg3 = layer3
      this.layerImg4 = layer4
      this.layerImg5 = layer5
      this.layerImg6 = layer6
      this.layerImg7 = layer7
      this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layerImg1)
      this.layer2 = new Layer(this.game, this.width, this.height, 0.9, this.layerImg2)
      this.layer3 = new Layer(this.game, this.width, this.height, 0.8, this.layerImg3)
      this.layer4 = new Layer(this.game, this.width, this.height, 0.6, this.layerImg4)
      this.layer5 = new Layer(this.game, this.width, this.height, 0.4, this.layerImg5)
      this.layer6 = new Layer(this.game, this.width, this.height, 0.2, this.layerImg6)
      this.layer7 = new Layer(this.game, this.width, this.height, 0, this.layerImg7)
      this.layers = [this.layer7, this.layer6, this.layer5, this.layer4, this.layer3, this.layer2, this.layer1]
    }
    update(){
      this.layers.forEach(layer => layer.update())
    }
    draw(context){
      this.layers.forEach(layer => layer.draw(context))
    }
}