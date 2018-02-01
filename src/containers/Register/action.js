import * as types from '../../types'

export const registerUserRequest = (credentials, name) => {
  return {
    type: types.REGISTER_USER_REQUEST,
    credentials,
    name
  }
}

export const registerUserSuccess = data => {
  return {
    type: types.REGISTER_USER_SUCCESS,
    data
  }
}

export const registerUserFailure = error => {
  return {
    type: types.REGISTER_USER_FAILURE,
    error
  }
}

export const resetRegisterUserRequest = () => {
  return {
    type: types.RESET_REGISTER_USER_REQUEST
  }
}

export const setRegisterData = model => {
  return {
    type: types.SET_REGISTER_DATA,
    model
  }
}