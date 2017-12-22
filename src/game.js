/**
 * Register globals
 */
const { Phaser } = require('./globals')
const { Game } = Phaser

const game = new Game(1200, 800, Phaser.CANVAS, 'phaser-test', {
  preload () {
    game.load.spritesheet('coin', './assets/coin-spritesheet.png', 160, 160, 2)
  },

  create () {
    for (let x = 0; x < 1200; x += 200) {
      for (let y = 0; y < 800; y += 200) {
        createCoin(x - 150, y - 150)
      }
    }
  }
});

function createCoin (xPos, yPos) {
  const coinSprite = game.add.sprite(xPos, yPos, 'coin')

  // simple tween animation
  const tween = game.add.tween(coinSprite)
    .to({ y: yPos - 100 }, 1000, Phaser.Easing.Linear.None)

  tween.onComplete.add(() => coinSprite.destroy())

  // Blend the colors a bit to simulate a fade out
  const startColor = 0xffffff
  const colorBlend = { step: 100 };
  const colorTween = game.add.tween(colorBlend)
    .to({ step: 0 }, 1000, Phaser.Easing.Linear.None)

  colorTween.onUpdateCallback(() => {
    coinSprite.tint = Phaser.Color.interpolateColor(0xffffff, 0x0000ff, 100, colorBlend.step)
  });

  // enable spritesheet animations
  coinSprite.animations.add('morph', [ 0, 1 ], 2, true)
  coinSprite.animations.play('morph')

  // enable input
  coinSprite.inputEnabled = true

  coinSprite.input.pixelPerfectClick = true
  coinSprite.input.pixelPerfectOver = true
  coinSprite.input.useHandCursor = true

  // on click, start the tween
  coinSprite.events.onInputDown.add(() => {
    if (coinSprite.input.pointerOver()) {
      tween.start()
      colorTween.start()
    }
  })
}
