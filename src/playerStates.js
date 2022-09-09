import { Dust, Energy, Splash } from './playerEffects.js'

const states = {
  IDLE: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ATTACKING: 4,
  DIVING: 5,
  HIT: 6
}

class State {
    constructor(state, game){
      this.state = state
      this.game = game
    }
}

export class Idle extends State {
    constructor(game){
      super('IDLE', game)
    }
    enter(){
      this.game.player.frameX = 0
      this.game.player.frameY = 0
      this.game.player.maxFrame = 14
    }
    handleInput(input){
      if((input.includes('ArrowLeft') || input.includes('ArrowRight')) && !input.includes('x')) this.game.player.setState(states.RUNNING, 2)
      else if(this.game.energy > 0 && input.includes('x') && !input.includes('ArrowDown')) this.game.player.setState(states.ATTACKING, 2)
      else if (input.includes('ArrowUp') && !input.includes('ArrowDown')) this.game.player.setState(states.JUMPING, 1)
    }
}

export class Running extends State {
    constructor(game){
      super('RUNNING', game)
    }
    enter(){
      this.game.player.frameX = 0
      this.game.player.frameY = 2
      this.game.player.maxFrame = 14
    }
    handleInput(input){
      this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.25, this.game.player.y + this.game.player.height))
      if(input.includes('ArrowDown') && !(input.includes('ArrowLeft') || input.includes('ArrowRight'))) this.game.player.setState(states.IDLE, 0)
      else if (input.includes('ArrowUp') && !input.includes('ArrowDown')) this.game.player.setState(states.JUMPING, 1)
      else if(this.game.energy > 0 && input.includes('x')) this.game.player.setState(states.ATTACKING, 2)
    }
}

export class Jumping extends State {
    constructor(game){
      super('JUMPING', game)
    }
    enter(){
      if(this.game.player.onGround()) this.game.player.vy = -27
      this.game.player.frameX = 0
      this.game.player.frameY = 1
      this.game.player.maxFrame = 14
    }
    handleInput(input){
      if(this.game.player.vy > this.game.player.weight) this.game.player.setState(states.FALLING, 1)
      else if(this.game.energy > 0 && input.includes('x')) this.game.player.setState(states.ATTACKING, 2)
      else if(input.includes('ArrowDown')) this.game.player.setState(states.DIVING, 0)
    }
}

export class Falling extends State {
    constructor(game){
      super('FALLING', game)
    }
    enter(){
      this.game.player.frameX = 0
      this.game.player.frameY = 1
      this.game.player.maxFrame = 14
    }
    handleInput(input){
      if(this.game.player.onGround()) this.game.player.setState(states.RUNNING, 2)
      else if(input.includes('ArrowDown')) this.game.player.setState(states.DIVING, 0)
    }
}

export class Attacking extends State {
    constructor(game){
      super('ATTACKING', game)
      this.sound = new Audio('assets/sounds/energyExplosion.wav')
    }
    enter(){
      this.sound.play()
      this.game.player.frameX = 0
      this.game.player.frameY = 2
      this.game.player.maxFrame = 14
    }
    handleInput(input){
      this.game.energy--
      this.game.particles.unshift(new Energy(this.game, this.game.player.x + this.game.player.width * 0.25, this.game.player.y + this.game.player.height * 0.5))
      if(this.game.energy < 1 && this.game.player.onGround()) this.game.player.setState(states.RUNNING, 2)
      if(this.game.energy < 1 && !this.game.player.onGround()) this.game.player.setState(states.FALLING, 1)
      else if(!input.includes('x') && this.game.player.onGround()) this.game.player.setState(states.RUNNING, 2)
      else if (!input.includes('x') && !this.game.player.onGround()) this.game.player.setState(states.FALLING, 1)
      else if (input.includes('x') && this.game.player.onGround() && input.includes('ArrowUp')) this.game.player.vy -= 27
      else if(this.game.energy > 30 && input.includes('ArrowDown') && !this.game.player.onGround()) this.game.player.setState(states.DIVING, 0)
    }
}

export class Diving extends State {
    constructor(game){
      super('DIVING', game)
      this.sound = new Audio('assets/sounds/divingAttack.wav')
    }
    enter(){
      this.sound.play()
      this.game.player.frameX = 0
      this.game.player.frameY = 1
      this.game.player.maxFrame = 14
      this.game.player.vy = 15
    }
    handleInput(input){
      this.game.energy--
      this.game.particles.unshift(new Energy(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5))
      if(this.game.player.onGround()){
        this.game.player.setState(states.RUNNING, 2)
        for(let i = 0; i < 20; i++){
        this.game.particles.unshift(new Splash(this.game, this.game.player.x, this.game.player.y))
        }
      }
      else if (this.game.energy > 0 && input.includes('x') && this.game.player.onGround() && !input.includes('ArrowDown')) this.game.player.setState(states.ATTACKING, 2)
    }
}

export class Hit extends State {
    constructor(game){
      super('HIT', game)
    }
    enter(){
      this.game.player.frameX = 0
      this.game.player.frameY = 0
      this.game.player.maxFrame = 14
    }
    handleInput(input){
      if(this.game.player.frameX >= 3 && this.game.player.onGround()) this.game.player.setState(states.RUNNING, 2)
      else if (this.game.player.frameX >= 3 && !this.game.player.onGround()) this.game.player.setState(states.FALLING, 1)
    }
}