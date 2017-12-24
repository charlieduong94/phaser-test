function createCoin (x, y) {
  return {
    type: 'CREATE_COIN',
    data: { x, y }
  }
}

function removeCoin (id) {
  return {
    type: 'REMOVE_COIN',
    data: { id }
  }
}

module.exports = { createCoin }
