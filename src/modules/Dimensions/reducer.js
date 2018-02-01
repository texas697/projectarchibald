import Immutable from 'immutable'
import * as types from '../../types'

const initialState = Immutable.Map({
  visibleHeight: 0,
  visibleWidth: 0
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_VISIBLE_HEIGHT:
      return state
        .set('visibleHeight', action.visibleHeight)

    case types.SET_VISIBLE_WIDTH:
      return state
        .set('visibleWidth', action.visibleWidth)

    default:
      return state
  }
}
