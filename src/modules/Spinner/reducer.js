import Immutable from 'immutable'
import * as types from '../../types'

const initialState = Immutable.Map({
  isSpinner: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SPINNER:
      return state
        .set('isSpinner', action.isSpinner)

    default:
      return state
  }
}
