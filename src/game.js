/**
 * Register globals
 */
const { Phaser } = require('./globals')
const { Game } = Phaser

const game = new Game(800, 600, Phaser.CANVAS, 'phaser-test', {
  preload () {
    game.load.image('cat', './assets/persona5_cat.jpg')
  },

  create () {
    const sprite = game.add.sprite(80, 0, 'cat');
  },
});
