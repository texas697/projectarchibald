import Immutable from 'immutable'
import * as types from '../../types'

const initialState = Immutable.Map({
  visibleModal: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_USER_MODAL:
      return state
        .set('visibleModal', !state.get('visibleModal'))

    default:
      return state
  }
}
