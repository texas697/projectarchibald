import Immutable from 'immutable'
import * as types from '../../types'

const initialState = Immutable.Map({
  data: Immutable.fromJS({}),
  error: {},
  isAuthenticating: false,
  isAuthenticated: false,
  isReseting: false,
  isLoggingOut: false,
  visibleModal: false,
  visibleForgotModal: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return state
        .set('isAuthenticating', true)

    case types.LOGIN_SUCCESS:
      return state
        .set('isAuthenticated', true)
        .set('isAuthenticating', false)
        .set('data', Immutable.fromJS(action.data))

    case types.LOGIN_FAILURE:
      return state
        .set('isAuthenticated', false)
        .set('isAuthenticating', false)
        .set('error', action.error)

    case types.LOGOUT_REQUEST:
      return state
        .set('isLoggingOut', true)

    case types.LOGOUT_SUCCESS:
      return state
        .set('isAuthenticated', false)
        .set('isLoggingOut', false)

    case types.LOGOUT_FAILURE:
      return state
        .set('isLoggingOut', false)
        .set('isAuthenticated', true)
        .set('error', action.error)

    case types.TOGGLE_CONTACT_US:
      return state
        .set('visibleModal', !state.get('visibleModal'))

    case types.TOGGLE_FORGOT_PASSWORD:
      return state
        .set('visibleForgotModal', !state.get('visibleForgotModal'))

    case types.RESET_PASSWORD_REQUEST:
      return state
        .set('isReseting', true)

    case types.RESET_PASSWORD_SUCCESS:
      return state
        .set('isReseting', false)

    case types.RESET_PASSWORD_FAILURE:
      return state
        .set('isReseting', false)
        .set('error', action.error)

    default:
      return state
  }
}
