import Immutable from 'immutable'
import * as types from '../../types/index'

export const INIT_STATE = {
  data: Immutable.fromJS([]),
  team: Immutable.fromJS({}),
  isFetching: false,
  isAdding: true,
  error: {}
}

const initialState = Immutable.Map(INIT_STATE)

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TEAMS_BY_ID_FETCH_REQUEST:
      return state
        .set('isFetching', true)

    case types.TEAMS_BY_ID_FETCH_SUCCESS:
      return state
        .set('isFetching', false)
        .set('team', Immutable.fromJS(action.team))

    case types.TEAMS_BY_ID_FETCH_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)

    case types.TEAMS_FETCH_REQUEST:
      return state
        .set('isFetching', true)

    case types.TEAMS_FETCH_SUCCESS:
      return state
        .set('isFetching', false)
        .set('data', Immutable.fromJS(action.data))

    case types.TEAMS_FETCH_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)

    case types.TEAMS_ADD_REQUEST:
      return state
        .set('isAdding', true)

    case types.TEAMS_ADD_SUCCESS:
      return state
        .set('isAdding', false)

    case types.TEAMS_ADD_FAILURE:
      return state
        .set('isAdding', false)
        .set('error', action.error)

    default:
      return state
  }
}
