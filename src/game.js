/**
 * Register globals
 */
const { Phaser } = require('./globals')
const { Game } = Phaser

const game = new Game(800, 600, Phaser.CANVAS, 'phaser-test', {
  preload () {
    game.load.image('cat', './assets/persona5_cat.jpg')
    game.load.image('coin', './assets/coin.png')
  },

  create () {
    // const sprite = game.add.sprite(80, 0, 'cat');
    const coinSprite = game.add.sprite(80, 0, 'coin')

    // simple tween animation
    const tween = game.add.tween(coinSprite)
    tween.to({ y: 100 }, 1000, Phaser.Easing.Linear.None, true)
      .to({ y: 0 }, 1000, Phaser.Easing.Linear.None, true)

    tween.start()

    // tween.loop(true)
  },
});
