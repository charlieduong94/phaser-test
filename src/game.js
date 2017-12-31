/**
 * Register globals
 */
const { Phaser } = require('./globals')
const { Game } = Phaser

let game
let player
let coinGroup
let bulletGroup

let shouldFire = true

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

    const emitter = game.add.emitter(coinSprite.x, coinSprite.y, 15)
    emitter.makeParticles('coin')
    emitter.gravity = 200
    emitter.explode()
  })

  return coinSprite
}

function createPlayer () {
  const player = game.add.sprite(500, 600, 'cabbage')
  player.animations.add('squeeze', [ 1, 0 ], 10)
  return player
}

function fireBullet (player) {
  if (!shouldFire) {
    return
  }

  const x = player.x + 70
  const y = player.y

  shouldFire = false
  player.animations.play('squeeze')

  setTimeout(() => {
    shouldFire = true
  }, 500)

  const bullet = game.add.sprite(x, y, 'coin')
  game.physics.arcade.enable(bullet)
  bullet.body.setSize(80, 80, 40, 40)

  bullet.tint = 0x00ff00

  bullet.onCollision = new Phaser.Signal()
  bullet.onCollision.add(() => bullet.kill())

  bulletGroup.add(bullet)

  bullet.anchor.set(0.5, 0.5)

  const bulletTween = game.add.tween(bullet)
    .to({ y: y - 1000, angle: '+360' }, 2000, Phaser.Easing.Quadratic.Out)

  bulletTween.start()
}

function destroyDeadObjects (group) {
  group.forEachDead((object) => object.destroy())
}

game = new Game(1200, 800, Phaser.CANVAS, 'phaser-test', {
  preload () {
    game.load.spritesheet('coin', './assets/coin-spritesheet.png', 160, 160, 2)
    game.load.spritesheet('cabbage', './assets/cabbage-spritesheet.png', 160, 160, 2)
  },

  create () {
    coinGroup = game.add.group()
    bulletGroup = game.add.group()

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 3; y++) {
        const xPos = (x * 100) + 100
        const yPos = (y * 100) + (xPos / 5) + 100
        const coin = createCoin(xPos, yPos)
        coinGroup.add(coin)
      }
    }

    player = createPlayer()
  },

  update () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      player.x -= 10
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      player.x += 10
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      fireBullet(player)
    }

    game.physics.arcade.collide(bulletGroup, coinGroup, (bullet, coin) => {
      if (coin.collided) {
        return false
      }
      coin.onCollision.dispatch()
      bullet.onCollision.dispatch()
      game.camera.shake(0.015, 250)
    })

    destroyDeadObjects(coinGroup)
    destroyDeadObjects(bulletGroup)
  },

  render () {
    /*
    coinGroup.forEach((coin) => game.debug.body(coin))
    bulletGroup.forEach((bullet) => game.debug.body(bullet))
    */
  }
});
