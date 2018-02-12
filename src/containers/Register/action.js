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

export const setIsCoach = () => {
  return {
    type: types.SET_REGISTER_IS_COACH
  }
}

export const setIsRecruiter = () => {
  return {
    type: types.SET_REGISTER_IS_RECRUITER
  }
}

export const setIsPlayer = () => {
  return {
    type: types.SET_REGISTER_IS_PLAYER
  }
}

export const setIsParent = () => {
  return {
    type: types.SET_REGISTER_IS_PARENT
  }
}

export const setIsCoordinator = () => {
  return {
    type: types.SET_REGISTER_IS_COORDINATOR
  }
}
