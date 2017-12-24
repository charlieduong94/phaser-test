const { call, select, put, takeEvery } = require('redux-saga/effects')

const CoinSprite = require('../components/CoinSprite')

const uuid = require('uuid')

function* addCoinSprite ({ data: { x, y } }) {
  try {
    const game = yield select((state) => state.game)
    const id = uuid.v4()

    // create the sprite
    const sprite = new CoinSprite({ id, game, x, y })

    yield put({
      type: 'COIN_ADDED',
      data: {
        sprite
      }
    })
  } catch (err) {
    console.error(err)
  }
}

function* coinSpriteSaga () {
  yield takeEvery('CREATE_COIN', addCoinSprite)
}

module.exports = coinSpriteSaga
