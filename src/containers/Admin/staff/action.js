import * as types from '../../../types/index'

export const setStaffData = model => {
  return {
    type: types.SET_STAFF_DATA,
    model
  }
}

export const setStaffImage = image => {
  return {
    type: types.SET_STAFF_IMAGE,
    image
  }
}

export const fetchStaffByIdRequest = id => {
  return {
    type: types.STAFF_BY_ID_FETCH_REQUEST,
    id
  }
}

export const fetchStaffByIdSuccess = staff => {
  return {
    type: types.STAFF_BY_ID_FETCH_SUCCESS,
    staff
  }
}

export const fetchStaffByIdFailure = error => {
  return {
    type: types.STAFF_BY_ID_FETCH_FAILURE,
    error
  }
}

export const fetchStaffRequest = teamId => {
  return {
    type: types.STAFF_FETCH_REQUEST,
    teamId
  }
}

export const fetchStaffSuccess = (data, options) => {
  return {
    type: types.STAFF_FETCH_SUCCESS,
    data,
    options
  }
}
export const fetchStaffFailure = error => {
  return {
    type: types.STAFF_FETCH_FAILURE,
    error
  }
}

export const addStaffRequest = model => {
  return {
    type: types.STAFF_ADD_REQUEST,
    model
  }
}

export const addStaffSuccess = () => {
  return {
    type: types.STAFF_ADD_SUCCESS
  }
}
export const addStaffFailure = error => {
  return {
    type: types.STAFF_ADD_FAILURE,
    error
  }
}

export const deleteStaffRequest = id => {
  return {
    type: types.STAFF_DELETE_REQUEST,
    id
  }
}

export const deleteStaffSuccess = () => {
  return {
    type: types.STAFF_DELETE_SUCCESS
  }
}

export const deleteStaffFailure = error => {
  return {
    type: types.STAFF_DELETE_FAILURE,
    error
  }
}

export const resetStaffData = () => {
  return {
    type: types.RESET_STAFF_DATA
  }
}

export const setStaffId = id => {
  return {
    type: types.SET_STAFF_ID,
    id
  }
}
