import * as types from '../../../types/index'

export const setRosterData = model => {
  return {
    type: types.SET_ROSTER_DATA,
    model
  }
}

export const fetchRosterRequest = model => {
  return {
    type: types.ROSTER_FETCH_REQUEST,
    model
  }
}

export const fetchRosterSuccess = data => {
  return {
    type: types.ROSTER_FETCH_SUCCESS,
    data
  }
}
export const fetchRosterFailure = error => {
  return {
    type: types.ROSTER_FETCH_FAILURE,
    error
  }
}

export const addRosterRequest = model => {
  return {
    type: types.ROSTER_ADD_REQUEST,
    model
  }
}

export const addRosterSuccess = () => {
  return {
    type: types.ROSTER_ADD_SUCCESS
  }
}
export const addRosterFailure = error => {
  return {
    type: types.ROSTER_ADD_FAILURE,
    error
  }
}

export const deleteRosterRequest = id => {
  return {
    type: types.ROSTER_DELETE_REQUEST,
    id
  }
}

export const deleteRosterSuccess = () => {
  return {
    type: types.ROSTER_DELETE_SUCCESS
  }
}

export const deleteRosterFailure = error => {
  return {
    type: types.ROSTER_DELETE_FAILURE,
    error
  }
}

export const resetRosterData = () => {
  return {
    type: types.RESET_ROSTER_DATA
  }
}
