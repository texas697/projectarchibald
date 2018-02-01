import Immutable from 'immutable'
import * as types from '../../types'
import {INPUT_FIELDS} from './config'

const initialState = Immutable.Map({
  error: {},
  name: '',
  isRegistering: false,
  model: Immutable.fromJS(INPUT_FIELDS)
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_USER_REQUEST:
      return state
        .set('isRegistering', true)
        .set('name', action.name)

    case types.REGISTER_USER_SUCCESS:
      return state
        .set('isRegistering', false)

    case types.REGISTER_USER_FAILURE:
      return state
        .set('isRegistering', false)
        .set('error', action.error)

    case types.RESET_REGISTER_USER_REQUEST:
      return state
        .set('isRegistering', false)
        .set('name', '')

    case types.SET_REGISTER_DATA:
      return state
        .set('model', action.model)

    default:
      return state
  }
}
