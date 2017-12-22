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
        createCoin(x - 40, y - 40)
      }
    }
  }
});

function createCoin (xPos, yPos) {
  const coinSprite = game.add.sprite(xPos, yPos, 'coin')

  const idleTween = game.add.tween(coinSprite)
    .to({ x: xPos + 80 }, 1000, Phaser.Easing.Linear.None)
    .to({ y: yPos + 80 }, 1000, Phaser.Easing.Linear.None)
    .to({ x: xPos }, 1000, Phaser.Easing.Linear.None)
    .to({ y: yPos }, 1000, Phaser.Easing.Linear.None)

  idleTween.loop(true)
  idleTween.start()

  // Blend the colors a bit to simulate a fade out
  const startColor = 0xffffff
  const colorBlend = { step: 100 };
  const colorTween = game.add.tween(colorBlend)
    .to({ step: 0 }, 1000, Phaser.Easing.Linear.None)

  colorTween.onUpdateCallback(() => {
    coinSprite.tint = Phaser.Color.interpolateColor(0xffffff, 0x0000ff, 100, colorBlend.step)
  });

  // simple onClick tween
  const clickTween = game.add.tween(coinSprite)
    .to({ y: yPos - 100 }, 1000, Phaser.Easing.Linear.None)

  clickTween.onComplete.add(() => coinSprite.destroy())

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
      idleTween.stop()
      clickTween.start()
      colorTween.start()
    }
  })
}
