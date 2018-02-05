import Immutable from 'immutable'
import * as types from '../../../types/index'
import {INPUT_FIELDS} from './config'

export const INIT_STATE = {
  model: Immutable.fromJS(INPUT_FIELDS),
  data: Immutable.fromJS([]),
  options: Immutable.fromJS([]),
  player: Immutable.fromJS({}),
  image: 'empty',
  id: '',
  isFetching: false,
  isAdding: true,
  isDeleting: true,
  error: {}
}

const initialState = Immutable.Map(INIT_STATE)

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PLAYER_BY_ID_FETCH_REQUEST:
      return state
        .set('isFetching', true)

    case types.PLAYER_BY_ID_FETCH_SUCCESS:
      return state
        .set('isFetching', false)
        .set('player', Immutable.fromJS(action.player))

    case types.PLAYER_BY_ID_FETCH_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)

    case types.PLAYER_FETCH_REQUEST:
      return state
        .set('isFetching', true)

    case types.PLAYER_FETCH_SUCCESS:
      return state
        .set('isFetching', false)
        .set('data', Immutable.fromJS(action.data))
        .set('options', Immutable.fromJS(action.options))

    case types.PLAYER_FETCH_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)

    case types.PLAYER_ADD_REQUEST:
      return state
        .set('isAdding', true)

    case types.PLAYER_ADD_SUCCESS:
      return state
        .set('isAdding', false)

    case types.PLAYER_ADD_FAILURE:
      return state
        .set('isAdding', false)
        .set('error', action.error)

    case types.PLAYER_DELETE_REQUEST:
      return state
        .set('isDeleting', true)

    case types.PLAYER_DELETE_SUCCESS:
      return state
        .set('isDeleting', false)

    case types.PLAYER_DELETE_FAILURE:
      return state
        .set('isDeleting', false)
        .set('error', action.error)

    case types.SET_PLAYER_DATA:
      return state
        .set('model', Immutable.fromJS(action.model))

    case types.SET_PLAYER_IMAGE:
      return state
        .set('image', action.image)

    case types.SET_PLAYER_ID:
      return state
        .set('id', action.id)

    case types.RESET_PLAYER_DATA:
      return state
        .set('id', '')
        .set('image', 'empty')
        .set('isFetching', false)
        .set('isAdding', false)
        .set('isDeleting', false)
        .set('data', Immutable.fromJS([]))
        .set('options', Immutable.fromJS([]))
        .set('model', Immutable.fromJS(INPUT_FIELDS))

    default:
      return state
  }
}
