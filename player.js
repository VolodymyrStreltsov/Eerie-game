import { Falling, Jumping, Running, Sitting } from './playerStates.js'

export default class Payer {
    constructor(game){
        this.game = game
        this.with = 100
        this.height = 91.3
        this.x = 0
        this.y = this.game.height - this.height - this.game.groundMargin
        this.vy = 0
        this.weight = 1
        this.image = player
        this.frameX = 0
        this.frameY = 0
        this.maxFrame
        this.fps = 20
        this.frameInterval = 1000 / this.fps
        this.frameTimer = 0
        this.speed = 0
        this.maxSpeed = 10
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)]
        this.currentState = this.states[0]
        this.currentState.enter()
    }
    update(input, deltaTime){
        this.currentState.handleInput(input)

        this.x += this.speed
        if(input.includes('ArrowRight')) this.speed = this.maxSpeed
        else if(input.includes('ArrowLeft')) this.speed = -this.maxSpeed
        else this.speed = 0
        if(this.x < 0) this.x = 0
        if(this.x > this.game.width - this.with) this.x = this.game.width - this.with

        this.y += this.vy
        if(!this.onGround()) this.vy += this.weight
        else this.vy = 0

        if(this.frameTimer > this.frameInterval){
          this.frameTimer = 0
          if(this.frameX < this.maxFrame) this.frameX++
          else this.frameX = 0
        } else this.frameTimer += deltaTime
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.with, this.frameY * this.height, this.with, this.height, this.x, this.y, this.with, this.height)
    }
    onGround(){
        return this.y === this.game.height - this.height - this.game.groundMargin
    }
    setState(state, speed){
        this.currentState = this.states[state]
        this.game.speed = this.game.maxSpeed * speed
        this.currentState.enter()
    }
}