const defaultState = { sprites: {} }

function spriteReducer (state = defaultState, action) {
  switch (action.type) {
    case 'COIN_ADDED':
      // register the new coin sprite with the sprite map
      const { sprite } = action.data
      state.sprites[sprite.id] = sprite
      break;
    case 'REMOVE_COIN':
      // register the new coin sprite with the sprite map
      const { id } = action.data
      delete state.sprites[id]
      break;
  }

  return state
}

module.exports = spriteReducer
