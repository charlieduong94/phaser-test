/**
 * Register globals
 */
const { Phaser } = require('./globals')
const { Game } = Phaser

let game
let player
let coinGroup
let bulletGroup

function createCoin (xPos, yPos) {
  const coinSprite = game.add.sprite(xPos, yPos, 'coin')
  game.physics.arcade.enable(coinSprite)

  coinSprite.body.setSize(80, 80, 40, 40)
  coinSprite.anchor.set(0.5, 0.5)

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
    coinSprite.alpha = colorBlend.step / 100
  });

  // simple onClick tween
  const collideTween = game.add.tween(coinSprite)
    .to({ y: yPos - 100, angle: '+360' }, 1000, Phaser.Easing.Quadratic.Out)

  collideTween.onComplete.add(() => coinSprite.kill())

  // enable spritesheet animations
  coinSprite.animations.add('morph', [ 0, 1 ], 2, true)
  coinSprite.animations.play('morph')

  // enable input
  coinSprite.inputEnabled = true

  coinSprite.input.pixelPerfectClick = true
  coinSprite.input.pixelPerfectOver = true
  coinSprite.input.useHandCursor = true

  // on collision, start the tween
  coinSprite.onCollision = new Phaser.Signal()
  coinSprite.onCollision.add(() => {
    coinSprite.collided = true

    idleTween.stop()
    collideTween.start()
    colorTween.start()
  })

  return coinSprite
}

function createBullet (x, y) {
  const bullet = game.add.sprite(x, y, 'coin')
  game.physics.arcade.enable(bullet)
  bullet.body.setSize(80, 80, 40, 40)

  bullet.tint = 0x00ff00

  bullet.onCollision = new Phaser.Signal()
  bullet.onCollision.add(() => bullet.kill())

  return bullet
}

function createPlayer () {
  const player = game.add.sprite(500, 600, 'cabbage')
  // playser.body.setSize(50, 50, 40, 40)

  game.input.keyboard.onDownCallback = ({ key }) => {
    switch (key) {
      case 'ArrowLeft':
        player.x -= 10
        break
      case 'ArrowRight':
        player.x += 10
        break
      case ' ': //spacebar
        // fire
        const bullet = createBullet(player.x + 70, player.y)
        bulletGroup.add(bullet)

        bullet.anchor.set(0.5, 0.5)

        const bulletTween = game.add.tween(bullet)
          .to({ y: player.y - 1000, angle: '+360' }, 2000, Phaser.Easing.Quadratic.Out)

        bulletTween.start()
        break
    }
  }
}

game = new Game(1200, 800, Phaser.CANVAS, 'phaser-test', {
  preload () {
    game.load.spritesheet('coin', './assets/coin-spritesheet.png', 160, 160, 2)
    game.load.image('cabbage', './assets/cabbage.png')
  },

  create () {
    coinGroup = game.add.group()
    bulletGroup = game.add.group()

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 3; y++) {
        const xPos = (x * 100) + 100
        const yPos = (y * 100) + (xPos / 5) + 100
        console.log(xPos, yPos)
        const coin = createCoin(xPos, yPos)
        coinGroup.add(coin)
      }
    }

    player = createPlayer()
  },

  update () {
    game.physics.arcade.collide(bulletGroup, coinGroup, (bullet, coin) => {
      if (coin.collided) {
        return false
      }
      coin.onCollision.dispatch()
      bullet.onCollision.dispatch()
    })
  },

  render () {
    /*
    coinGroup.forEach((coin) => game.debug.body(coin))
    bulletGroup.forEach((bullet) => game.debug.body(bullet))
    */
  }
});
