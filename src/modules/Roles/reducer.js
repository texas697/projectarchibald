import Immutable from 'immutable'
import * as types from '../../types/index'

export const INIT_STATE = {
  data: Immutable.fromJS([]),
  isFetching: false,
  isAdding: true,
  error: {}
}

const initialState = Immutable.Map(INIT_STATE)

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ROLES_FETCH_REQUEST:
      return state
        .set('isFetching', true)

    case types.ROLES_FETCH_SUCCESS:
      return state
        .set('isFetching', false)
        .set('data', Immutable.fromJS(action.data))

    case types.ROLES_FETCH_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)

    case types.ROLES_ADD_REQUEST:
      return state
        .set('isAdding', true)

    case types.ROLES_ADD_SUCCESS:
      return state
        .set('isAdding', false)

    case types.ROLES_ADD_FAILURE:
      return state
        .set('isAdding', false)
        .set('error', action.error)

    default:
      return state
  }
}
