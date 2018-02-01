import * as types from '../../types'

export const loginRequest = credentials => {
  return {
    type: types.LOGIN_REQUEST,
    credentials
  }
}

export const loginSuccess = data => {
  return {
    type: types.LOGIN_SUCCESS,
    data
  }
}

export const loginFailure = error => {
  return {
    type: types.LOGIN_FAILURE,
    error
  }
}

export const logoutRequest = () => {
  return {
    type: types.LOGOUT_REQUEST
  }
}

export const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS
  }
}

export const logoutFailure = error => {
  return {
    type: types.LOGOUT_FAILURE,
    error
  }
}

export const toggleContactUs = () => {
  return {
    type: types.TOGGLE_CONTACT_US
  }
}

export const toggleForgotPass = () => {
  return {
    type: types.TOGGLE_FORGOT_PASSWORD
  }
}

export const resetPasswordRequest = email => {
  return {
    type: types.RESET_PASSWORD_REQUEST,
    email
  }
}

export const resetPasswordSuccess = () => {
  return {
    type: types.RESET_PASSWORD_SUCCESS
  }
}

export const resetPasswordFailure = error => {
  return {
    type: types.RESET_PASSWORD_FAILURE,
    error
  }
}
