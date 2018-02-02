import Immutable from 'immutable'
import * as types from '../../../types/index'
import {INPUT_FIELDS} from './config'

export const INIT_STATE = {
  model: Immutable.fromJS(INPUT_FIELDS),
  data: Immutable.fromJS([]),
  options: Immutable.fromJS([]),
  image: 'empty',
  isFetching: false,
  isAdding: true,
  isDeleting: true,
  error: {}
}

const initialState = Immutable.Map(INIT_STATE)

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TEAM_FETCH_REQUEST:
      return state
        .set('isFetching', true)

    case types.TEAM_FETCH_SUCCESS:
      return state
        .set('isFetching', false)
        .set('data', Immutable.fromJS(action.data))
        .set('options', Immutable.fromJS(action.options))

    case types.TEAM_FETCH_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)

    case types.TEAM_ADD_REQUEST:
      return state
        .set('isAdding', true)

    case types.TEAM_ADD_SUCCESS:
      return state
        .set('isAdding', false)

    case types.TEAM_ADD_FAILURE:
      return state
        .set('isAdding', false)
        .set('error', action.error)

    case types.TEAM_DELETE_REQUEST:
      return state
        .set('isDeleting', true)

    case types.TEAM_DELETE_SUCCESS:
      return state
        .set('isDeleting', false)

    case types.TEAM_DELETE_FAILURE:
      return state
        .set('isDeleting', false)
        .set('error', action.error)

    case types.SET_TEAM_DATA:
      return state
        .set('model', action.model)

    case types.SET_TEAM_IMAGE:
      return state
        .set('image', action.image)

    case types.RESET_TEAM_DATA:
      return state
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
