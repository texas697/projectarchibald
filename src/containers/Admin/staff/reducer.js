import Immutable from 'immutable'
import * as types from '../../../types/index'
import {INPUT_FIELDS} from './config'

export const INIT_STATE = {
  model: Immutable.fromJS(INPUT_FIELDS),
  data: Immutable.fromJS([]),
  options: Immutable.fromJS([]),
  staff: Immutable.fromJS({}),
  image: '',
  id: '',
  isFetching: false,
  isAdding: true,
  isDeleting: true,
  error: {}
}

const initialState = Immutable.Map(INIT_STATE)

export default (state = initialState, action) => {
  switch (action.type) {
    case types.STAFF_BY_ID_FETCH_REQUEST:
      return state
        .set('isFetching', true)

    case types.STAFF_BY_ID_FETCH_SUCCESS:
      return state
        .set('isFetching', false)
        .set('staff', Immutable.fromJS(action.staff))

    case types.STAFF_BY_ID_FETCH_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)

    case types.STAFF_FETCH_REQUEST:
      return state
        .set('isFetching', true)

    case types.STAFF_FETCH_SUCCESS:
      return state
        .set('isFetching', false)
        .set('data', Immutable.fromJS(action.data))
        .set('options', Immutable.fromJS(action.options))

    case types.STAFF_FETCH_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)

    case types.STAFF_ADD_REQUEST:
      return state
        .set('isAdding', true)

    case types.STAFF_ADD_SUCCESS:
      return state
        .set('isAdding', false)

    case types.STAFF_ADD_FAILURE:
      return state
        .set('isAdding', false)
        .set('error', action.error)

    case types.STAFF_DELETE_REQUEST:
      return state
        .set('isDeleting', true)

    case types.STAFF_DELETE_SUCCESS:
      return state
        .set('isDeleting', false)

    case types.STAFF_DELETE_FAILURE:
      return state
        .set('isDeleting', false)
        .set('error', action.error)

    case types.SET_STAFF_DATA:
      return state
        .set('model', Immutable.fromJS(action.model))

    case types.SET_STAFF_ID:
      return state
        .set('id', action.id)

    case types.SET_STAFF_IMAGE:
      return state
        .set('image', action.image)

    case types.RESET_STAFF_DATA:
      return state
        .set('id', '')
        .set('image', '')
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
