function registerGame (game) {
  return {
    type: 'REGISTER_GAME',
    data: { game }
  }
}

module.exports = { registerGame }
