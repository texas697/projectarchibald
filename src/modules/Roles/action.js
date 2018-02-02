import * as types from '../../types'

export const fetchRolesRequest = uid => {
  return {
    type: types.ROLES_FETCH_REQUEST,
    uid
  }
}

export const fetchRolesSuccess = data => {
  return {
    type: types.ROLES_FETCH_SUCCESS,
    data
  }
}

export const fetchRolesFailure = error => {
  return {
    type: types.ROLES_FETCH_FAILURE,
    error
  }
}

export const addRolesRequest = model => {
  return {
    type: types.ROLES_ADD_REQUEST,
    model
  }
}

export const addRolesSuccess = () => {
  return {
    type: types.ROLES_ADD_SUCCESS
  }
}

export const addRolesFailure = error => {
  return {
    type: types.ROLES_ADD_FAILURE,
    error
  }
}
