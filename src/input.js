export default class InputHandler {
    constructor(game){
      this.game = game
      this.keys = []
      this.touchY = ''
      this.touchX = ''
      this.touchThreshold = 30
      window.addEventListener('keydown', e => {
        if(( e.key === 'ArrowDown' ||
             e.key === 'ArrowUp'   ||
             e.key === 'ArrowLeft' ||
             e.key === 'ArrowRight'||
             e.key === 'x')
             && this.keys.indexOf(e.key) === -1){
          this.keys.push(e.key)
        } // else if(e.key === 'd') this.game.debug = !this.game.debug // uncomment for debugging
          else if(e.key === 'Enter' && this.game.gameOver) this.game.restart()
      })
      window.addEventListener('keyup', e => {
        if(  e.key === 'ArrowDown' ||
             e.key === 'ArrowUp'   ||
             e.key === 'ArrowLeft' ||
             e.key === 'ArrowRight'||
             e.key === 'x'){
          this.keys.splice(this.keys.indexOf(e.key), 1)
        }
      })

      window.addEventListener('touchstart', e => {
        this.touchY = e.changedTouches[0].clientY
        this.touchX = e.changedTouches[0].clientX
      })
      window.addEventListener('touchmove', e => {
        const swipeDistanceY = this.touchY - e.changedTouches[0].clientY
        const swipeDistanceX = this.touchX - e.changedTouches[0].clientX
        const attack = e.changedTouches.length > 1

        if(attack && this.keys.indexOf('x') === -1) this.keys.push('x')
        else if(swipeDistanceY < -this.touchThreshold && this.keys.indexOf('ArrowDown') === -1) this.keys.push('ArrowDown')
        else if(swipeDistanceY > this.touchThreshold && this.keys.indexOf('ArrowUp') === -1) this.keys.push('ArrowUp')
        else if(swipeDistanceX < -this.touchThreshold && this.keys.indexOf('ArrowRight') === -1) this.keys.push('ArrowRight')
        else if(swipeDistanceX > this.touchThreshold && this.keys.indexOf('ArrowLeft') === -1) this.keys.push('ArrowLeft')
      })
      window.addEventListener('touchend', e => {
        this.keys.splice(this.keys.indexOf('x'), 1)
        this.keys.splice(this.keys.indexOf('ArrowUp'), 1)
        this.keys.splice(this.keys.indexOf('ArrowDown'), 1)
        this.keys.splice(this.keys.indexOf('ArrowLeft'), 1)
        this.keys.splice(this.keys.indexOf('ArrowRight'), 1)
        if(this.keys.indexOf('ArrowUp') && this.game.gameOver) this.game.restart()
      })
  }
}