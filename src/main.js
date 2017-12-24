/**
 * Game entrypoint
 */

const { Phaser } = require('./globals')
const { Game } = Phaser

const { registerGame } = require('./actions/game')
const { createCoin } = require('./actions/sprite')

const store = require('./store')

const game = new Game(1200, 800, Phaser.CANVAS, 'phaser-test', {
  preload () {
    // preload all game assets here
    game.load.spritesheet(
      'coin',
      './assets/coin-spritesheet.png',
      160,
      160,
      2
    )
  },

  create () {
    // register the game with the store so that
    // it can be used in our effects
    store.dispatch(registerGame(game))

    // start dispatching actions necessary
    // to get game created
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 7; y++) {
        let xPos = x * 100
        let yPos = y * 100
        store.dispatch(createCoin(xPos, yPos))
      }
    }
  }
});
