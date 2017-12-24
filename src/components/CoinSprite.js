const { Phaser } = require('../globals')
const store = require('../store')

const { removeCoin } = require('../actions/sprite')

class CoinSprite {
  constructor ({id, game, x, y}) {
    this.id = id
    const coinSprite = this.coinSprite =
      game.add.sprite(x, y, 'coin')

    const idleTween = game.add.tween(coinSprite)
      .to({ x: x + 80 }, 1000, Phaser.Easing.Linear.None)
      .to({ y: y + 80 }, 1000, Phaser.Easing.Linear.None)
      .to({ x: x }, 1000, Phaser.Easing.Linear.None)
      .to({ y: y }, 1000, Phaser.Easing.Linear.None)

    idleTween.loop(true)
    idleTween.start()

    // Blend the colors a bit to simulate a fade out
    const startColor = 0xffffff
    const colorBlend = { step: 100 };
    const colorTween = game.add.tween(colorBlend)
      .to({ step: 0 }, 1000, Phaser.Easing.Linear.None)

    colorTween.onUpdateCallback(() => {
      coinSprite.alpha = colorBlend.step / 100
    });

    // simple onClick tween
    const clickTween = game.add.tween(coinSprite)
      .to({ y: y - 100 }, 1000, Phaser.Easing.Linear.None)

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

        store.dispatch(removeSprite(id))
      }
    })
  }
}

module.exports = CoinSprite
