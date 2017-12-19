/**
 * Register globals.
 *
 * This needs to be done to properly use Phaser
 */
window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')

module.exports = {
  PIXI,
  p2,
  Phaser
}
