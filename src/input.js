export default class InputHandler {
    constructor(game){
      this.game = game
      this.keys = []
      this.touchY = ''
      this.touchTreshold = 30
      window.addEventListener('keydown', e => {
        if(( e.key === 'ArrowDown' ||
             e.key === 'ArrowUp'   ||
             e.key === 'ArrowLeft' ||
             e.key === 'ArrowRight'||
             e.key === 'x')
             && this.keys.indexOf(e.key) === -1){
          this.keys.push(e.key)
        } else if(e.key === 'd') this.game.debug = !this.game.debug
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
      })
      window.addEventListener('touchmove', e => {
        const swipeDistance = this.touchY - e.changedTouches[0].clientY
        if(swipeDistance < -this.touchTreshold && this.keys.indexOf('ArrowDown') === -1) this.keys.push('ArrowDown')
        else if(swipeDistance > this.touchTreshold && this.keys.indexOf('ArrowUp') === -1) this.keys.push('ArrowUp')
      })
      window.addEventListener('touchend', e => {
        console.log(this.keys)
        this.keys.splice(this.keys.indexOf('ArrowUp'), 1)
        this.keys.splice(this.keys.indexOf('ArrowDown'), 1)
        if(this.keys.indexOf('ArrowUp') && this.game.gameOver) this.game.restart()
      })
  }
}