const defaultState = null

function gameReducer (state = defaultState, action) {
  if (action.type === 'REGISTER_GAME') {
    return action.data.game
  }
  return state
}

module.exports = gameReducer
