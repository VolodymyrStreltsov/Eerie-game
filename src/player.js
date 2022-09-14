import { Explosion, FloatingMessage } from './collisionEffects.js'
import { Attacking, Diving, Falling, Hit, Idle, Jumping, Running } from './playerStates.js'

export default class Payer {
    constructor(game){
        this.game = game
        this.width = 100
        this.height = 92
        this.x = 50
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
        this.states = [new Idle(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Attacking(this.game), new Diving(this.game), new Hit(this.game)]
    }
    update(input, deltaTime){
        this.checkCollision()
        this.currentState.handleInput(input)

        this.x += this.speed

        if(this.game.currentState !== this.states[4] && this.game.currentState !== this.states[5] && this.game.energy < this.game.energyMax){
            this.game.energy += 0.1
        }

        if(input.includes('ArrowRight') && this.currentState !== this.states[6]) this.speed = this.maxSpeed
        else if(input.includes('ArrowLeft') && this.currentState !== this.states[6]) this.speed = -this.maxSpeed
        else this.speed = 0

        if(this.x < 0) this.x = 0
        if(this.x > this.game.width - this.width) this.x = this.game.width - this.width

        this.y += this.vy
        if(!this.onGround()) this.vy += this.weight
        else this.vy = 0

        if(this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin

        if(this.frameTimer > this.frameInterval){
          this.frameTimer = 0
          if(this.frameX < this.maxFrame) this.frameX++
          else this.frameX = 0
        } else this.frameTimer += deltaTime
    }
    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y + 10, this.width * 0.4, this.height - 20)
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin
    }
    setState(state, speed){
        this.currentState = this.states[state]
        this.game.speed = this.game.maxSpeed * speed
        this.currentState.enter()
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if(enemy.x + enemy.sizeModifier + 5 < this.x + this.width * 0.4 &&
               enemy.x + enemy.sizeModifier + 5 + enemy.width * 0.8 > this.x &&
               enemy.y + enemy.sizeModifier + 5 < this.y + 10 + this.height - 20 &&
               enemy.y + enemy.sizeModifier + 5 + enemy.height * 0.8 > this.y + 10){
                enemy.readyForDelete = true
                this.game.collisions.push(new Explosion(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
                if(this.currentState === this.states[4] ||
                   this.currentState === this.states[5]){
               // this.game.score++ // uncomment this line to add score on kill enemy
                } else {
                    this.setState(6, 0)
                    this.game.lives--
                }
            }
        })
        this.game.rewards.forEach(reward => {
            if(reward.x < this.x + this.width * 0.4 &&
               reward.x + reward.width * 0.8 > this.x &&
               reward.y < this.y + 10 + this.height - 20 &&
               reward.y + reward.height * 0.8 > this.y + 10){
                reward.readyForDelete = true
                this.game.collisions.push(new FloatingMessage('+1', reward.x + reward.width * 0.5, reward.y + reward.height * 0.5, 170, 50))
                this.game.score++
            }
        })
    }
    restart(){
        this.x = 50
        this.y = this.game.height - this.height - this.game.groundMargin
        this.vy = 0
        this.speed = 0
        this.setState(0, 1)
    }
}