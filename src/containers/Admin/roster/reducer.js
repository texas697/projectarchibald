import Immutable from 'immutable'
import * as types from '../../../types/index'
import {INPUT_FIELDS} from './config'

export const INIT_STATE = {
  coachId: '',
  hsId: '',
  teamId: '',
  player: Immutable.fromJS([]),
  staff: Immutable.fromJS([]),
  id: '',
  isFetching: false,
  isAdding: true,
  isDeleting: true,
  error: {}
}

const initialState = Immutable.Map(INIT_STATE)

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ROSTER_BY_ID_FETCH_REQUEST:
      return state
        .set('isFetching', true)

    case types.ROSTER_BY_ID_FETCH_SUCCESS:
      return state
        .set('isFetching', false)

    case types.ROSTER_BY_ID_FETCH_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)

    case types.ROSTER_FETCH_REQUEST:
      return state
        .set('isFetching', true)

    case types.ROSTER_FETCH_SUCCESS:
      return state
        .set('isFetching', false)
        .set('id', action.data ? action.data.id : '')
        .set('coachId', action.data ? action.data.coachId : '')
        .set('hsId', action.data ? action.data.hsId : '')
        .set('teamId', action.data ? action.data.teamId : '')
        .set('player', Immutable.fromJS(action.data ? action.data.player : []))
        .set('staff', Immutable.fromJS(action.data ? action.data.staff : []))

    case types.ROSTER_FETCH_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)

    case types.ROSTER_ADD_REQUEST:
      return state
        .set('isAdding', true)

    case types.ROSTER_ADD_SUCCESS:
      return state
        .set('isAdding', false)

    case types.ROSTER_ADD_FAILURE:
      return state
        .set('isAdding', false)
        .set('error', action.error)

    case types.ROSTER_DELETE_REQUEST:
      return state
        .set('isDeleting', true)

    case types.ROSTER_DELETE_SUCCESS:
      return state
        .set('isDeleting', false)

    case types.ROSTER_DELETE_FAILURE:
      return state
        .set('isDeleting', false)
        .set('error', action.error)

    case types.SET_ROSTER_PLAYER:
      return state
        .set('player', Immutable.fromJS(action.player))

    case types.SET_ROSTER_STAFF:
      return state
        .set('staff', Immutable.fromJS(action.staff))

    case types.RESET_ROSTER_DATA:
      return state
        .set('id', '')
        .set('coachId', '')
        .set('hsId', '')
        .set('teamId', '')
        .set('id', '')
        .set('image', 'empty')
        .set('isFetching', false)
        .set('isAdding', false)
        .set('isDeleting', false)
        .set('player', Immutable.fromJS([]))
        .set('staff', Immutable.fromJS([]))

    case types.SET_ROSTER_ID:
      return state
        .set('id', action.id)

    default:
      return state
  }
}
