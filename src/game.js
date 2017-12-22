/**
 * Register globals
 */
const { Phaser } = require('./globals')
const { Game } = Phaser

const game = new Game(1200, 800, Phaser.CANVAS, 'phaser-test', {
  preload () {
    game.load.image('cat', './assets/persona5_cat.jpg')
    game.load.image('coin', './assets/coin.png')
  },

  create () {
    createCoin(0, 100);
    createCoin(200, 100);
    createCoin(400, 100);
    createCoin(600, 100);
    createCoin(800, 100);
  },
});

function createCoin (xPos, yPos) {
  // const sprite = game.add.sprite(80, 0, 'cat');
  const coinSprite = game.add.sprite(xPos, yPos, 'coin')

  // simple tween animation
  const tween = game.add.tween(coinSprite)
  // .to({ y: 100 }, 1000, Phaser.Easing.Linear.None)
    .to({ y: 0 }, 1000, Phaser.Easing.Linear.None)

  // tween.loop(true)
  // tween.start()

  const startColor = 0xffffff

  const colorBlend = { step: 100 };
  const colorTween = game.add.tween(colorBlend)
  // .to({ step: 100 }, 1000, Phaser.Easing.Linear.None)
    .to({ step: 0 }, 1000, Phaser.Easing.Linear.None)

  colorTween.onUpdateCallback(() => {
    coinSprite.tint = Phaser.Color.interpolateColor(0xffffff, 0x0000ff, 100, colorBlend.step)
  });

  tween.onComplete.add(() => {
    coinSprite.destroy()
  })

  // colorTween.loop(true)
  // colorTween.start()

  coinSprite.inputEnabled = true
  coinSprite.events.onInputDown.add(() => {
    tween.start()
    colorTween.start()
  })
}
