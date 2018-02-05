import Immutable from 'immutable'
import * as types from '../../../types/index'
import {INPUT_FIELDS} from './config'

export const INIT_STATE = {
  model: Immutable.fromJS(INPUT_FIELDS),
  data: Immutable.fromJS([]),
  options: Immutable.fromJS([]),
  coach: Immutable.fromJS({}),
  id: '',
  image: '',
  isFetching: false,
  isAdding: true,
  isDeleting: true,
  error: {}
}

const initialState = Immutable.Map(INIT_STATE)

export default (state = initialState, action) => {
  switch (action.type) {
    case types.COACH_BY_ID_FETCH_REQUEST:
      return state
        .set('isFetching', true)

    case types.COACH_BY_ID_FETCH_SUCCESS:
      return state
        .set('isFetching', false)
        .set('coach', Immutable.fromJS(action.coach))

    case types.COACH_BY_ID_FETCH_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)

    case types.COACH_FETCH_REQUEST:
      return state
        .set('isFetching', true)

    case types.COACH_FETCH_SUCCESS:
      return state
        .set('isFetching', false)
        .set('data', Immutable.fromJS(action.data))
        .set('options', Immutable.fromJS(action.options))

    case types.COACH_FETCH_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)

    case types.COACH_ADD_REQUEST:
      return state
        .set('isAdding', true)

    case types.COACH_ADD_SUCCESS:
      return state
        .set('isAdding', false)

    case types.COACH_ADD_FAILURE:
      return state
        .set('isAdding', false)
        .set('error', action.error)

    case types.COACH_DELETE_REQUEST:
      return state
        .set('isDeleting', true)

    case types.COACH_DELETE_SUCCESS:
      return state
        .set('isDeleting', false)

    case types.COACH_DELETE_FAILURE:
      return state
        .set('isDeleting', false)
        .set('error', action.error)

    case types.SET_COACH_DATA:
      return state
        .set('model', Immutable.fromJS(action.model))

    case types.SET_COACH_IMAGE:
      return state
        .set('image', action.image)

    case types.RESET_COACH_DATA:
      return state
        .set('id', '')
        .set('image', '')
        .set('isFetching', false)
        .set('isAdding', false)
        .set('isDeleting', false)
        .set('data', Immutable.fromJS([]))
        .set('options', Immutable.fromJS([]))
        .set('model', Immutable.fromJS(INPUT_FIELDS))

    case types.SET_COACH_ID:
      return state
        .set('id', action.id)

    default:
      return state
  }
}
