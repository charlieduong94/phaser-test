const { createStore, applyMiddleware } = require('redux')
const { default: createSagaMiddleware } = require('redux-saga')

const reducers = require('./reducers')
const spriteSaga = require('./sagas/sprite')

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(spriteSaga)

module.exports = store
