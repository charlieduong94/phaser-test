const { combineReducers } = require('redux')

module.exports = combineReducers({
  game: require('./game'),
  sprite: require('./sprite')
})
