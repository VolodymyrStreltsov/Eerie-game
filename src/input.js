export default class InputHandler {
    constructor(game){
      this.game = game
      this.keys = []
      this.touchY = ' '
      this.touchX = ' '
      this.touchThreshold = 30
      window.addEventListener('keydown', e => {
        if(( e.key === 'ArrowDown' ||
             e.key === 'ArrowUp'   ||
             e.key === 'ArrowLeft' ||
             e.key === 'ArrowRight'||
             e.key === ' ')
             && this.keys.indexOf(e.key) === -1){
          this.keys.push(e.key)
        } // else if(e.key === 'd') this.game.debug = !this.game.debug // uncomment for debugging
          else if(e.key === 'Enter' && this.game.gameOver){
            setTimeout(() => {this.game.restart()
          }, 550);
      }
      })
      window.addEventListener('keyup', e => {
        if(  e.key === 'ArrowDown' ||
             e.key === 'ArrowUp'   ||
             e.key === 'ArrowLeft' ||
             e.key === 'ArrowRight'||
             e.key === ' '){
          this.keys.splice(this.keys.indexOf(e.key), 1)
        }
      })
  }
}